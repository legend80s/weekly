# 解决 fetch 请求超时的一个常见误区

文章核心观点：

1. 问题：setTimeout + AbortController 只中断 fetch 的网络请求阶段，不中断响应体读取阶段
2. 解决：用 AbortSignal.timeout() 可以覆盖全流程
3. 原因：fetch 完成后 abort 信号已失效，响应体读取是独立阶段

## 背景

在 Node.js 或 Bun 中实现网络请求超时是一件看似简单却暗藏陷阱的事情。最近在开发图片下载工具时，我遇到了一个有趣的问题：设置了 30 秒超时，但请求经常"假死"，直到整个进程结束都没有触发超时。

## 问题的代码

最初的代码是这样的：

```typescript
async function downloadImage(url: string, destPath: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  const response = await fetch(url, { signal: controller.signal })
  
  clearTimeout(timeout)
  await Bun.write(destPath, response)
  // ...
}
```

看起来很合理：用 `setTimeout` 30 秒后调用 `controller.abort()`，再把 signal 传给 fetch。

但实际运行发现：fetch 返回了（说明网络通信完成），但 `Bun.write` 写入 2MB+ 的大文件时卡住了，整个进程就卡在那里，30 秒超时完全没有生效。

## 原因分析

问题的根源在于：**`AbortController.abort()` 只会中断 fetch 的网络请求阶段，但不会中断后续的响应体读取和写入阶段**。

fetch 的执行流程大致如下：

```
DNS 解析 → TCP 连接 → TLS 握手 → 发送请求 → 接收响应头 → 读取响应体 → 写入文件
         ↑                                        ↑
      这个阶段会被 abort 中断              这个阶段不会被中断！
```

当服务器开始传输响应体数据时，即使发送了 abort 信号，底层的网络连接可能已经建立，数据正在流动。此时：

1. fetch 已经拿到了 response 对象（请求阶段已完成）
2. `controller.abort()` 对已经完成的请求不再起作用
3. 读取响应体（`response.arrayBuffer()` 或 `Bun.write(response)`）是一个耗时操作，且**不受 abort signal 控制**

## 解决方案

使用 `AbortSignal.timeout()` 替代手动 `setTimeout` + `AbortController`：

```typescript
async function downloadImage(url: string, destPath: string) {
  try {
    // AbortSignal.timeout() 会创建一个超时 signal，整个 fetch 操作都会受它控制
    const response = await fetch(url, { 
      signal: AbortSignal.timeout(30000) 
    })
    
    await Bun.write(destPath, response)
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.warn('请求超时')
    }
  }
}
```

## 深入理解 AbortSignal.timeout()

`AbortSignal.timeout()` 是 Web API 的一个较新特性（Bun 和 Node.js 18+ 已支持），它创建的超时信号有以下特点：

1. **全流程覆盖**：不仅中断网络请求，还会中断响应体的读取
2. **自动清理**：超时后自动清理，不需要手动 `clearTimeout`
3. **语义明确**：超时时会抛出 `TimeoutError`，易于识别

不过需要注意：`Bun.write()` 虽然响应读取会受超时控制，但写入文件系统本身不受 abort signal 控制。如果写入非常慢（比如磁盘IO问题），超时可能无法中断它。

## 验证测试

使用 2MB 以上的图片进行测试：

- 使用 `setTimeout` + `AbortController`：fetch 返回后，write 阶段卡住 20+ 秒，超时未触发
- 使用 `AbortSignal.timeout(2000)`：2 秒后正确抛出 TimeoutError

```
⬇️ start downloading: https://example.com/image.png
⏱️ timeout (2s): https://example.com/image.png
```

## 总结

| 方案 | 网络请求阶段 | 响应体读取阶段 | 建议 |
|------|------------|-------------|------|
| setTimeout + AbortController | ✅ | ❌ | 不推荐 |
| AbortSignal.timeout() | ✅ | ✅ | **推荐** |

这个问题很隐蔽，因为：

1. 小文件通常在几秒内完成，看不出问题
2. 网络环境好时，响应体传输快，也不会触发
3. 只有下载大文件或网络慢时才会暴露

希望这个踩坑记录能帮到遇到同样问题的同学。
