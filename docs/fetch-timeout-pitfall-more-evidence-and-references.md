# 解决 fetch 请求超时的一个常见误区

> 本文探讨了 JavaScript fetch 请求超时实现中的一个常见问题，并提供了更可靠的解决方案。

## 核心观点

1. **问题**：`setTimeout` + `AbortController` 方式在某些场景下无法正确触发超时
2. **解决**：使用 `AbortSignal.timeout()` 更可靠
3. **原因**：Bun 的 fetch 实现在处理 abort signal 时存在边界情况问题

## 背景

在 Bun 中实现网络请求超时时，我遇到了一个有趣的问题：设置了 30 秒超时，但大文件下载时请求"假死"，超时完全没有生效。

## 问题的代码

```typescript
async function downloadImage(url: string, destPath: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  const response = await fetch(url, { signal: controller.signal })
  
  clearTimeout(timeout)
  await Bun.write(destPath, response)
}
```

实际运行结果：fetch 返回了（网络通信完成），但 `Bun.write` 写入 2MB+ 大文件时卡住 20+ 秒，超时未触发。

## 原因分析

根据 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)：

> "Aborts an asynchronous operation before it has completed. This is able to abort **fetch requests, consumption of any response bodies**, and streams."

理论上 abort 应该可以中断响应体读取。但 Bun 的 fetch 实现存在一些问题：

### Bun 的已知问题

GitHub 上有多个已关闭的 Bun issue 证实了这一问题：

- [#7512](https://github.com/oven-sh/bun/issues/7512): fetch's signal AbortSignal.timeout don't work
- [#13302](https://github.com/oven-sh/bun/issues/13302): AbortSignal.timeout and fetch not working when can't reach server
- [#18536](https://github.com/oven-sh/bun/issues/18536): AbortSignal.timeout does nothing in fetch when the host drops all packets

这些问题已修复，但在某些边界情况下可能仍有问题。

### 另一个关键点

即使 abort 正常工作，还有一个问题：

```typescript
const response = await fetch(url, { signal: controller.signal })
clearTimeout(timeout)  // fetch 返回后立即清除超时
await Bun.write(destPath, response)  // 这时超时机制已经失效
```

当 fetch 返回 response 后，超时计时器被清除，后续的 write 操作不受任何超时控制。

## 解决方案

使用 `AbortSignal.timeout()`：

```typescript
async function downloadImage(url: string, destPath: string) {
  try {
    const response = await fetch(url, { 
      signal: AbortSignal.timeout(30000) 
    })
    
    await Bun.write(destPath, response)
  } catch (err: any) {
    if (err.name === 'TimeoutError') {
      console.warn('请求超时')
    }
  }
}
```

## AbortSignal.timeout() 的优势

根据 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)：

1. **全流程覆盖**：整个 fetch 操作都在超时控制下
2. **自动清理**：不需要手动 clearTimeout
3. **语义明确**：超时抛出 `TimeoutError`（而 abort 抛出 `AbortError`）
4. **Baseline 2024**：2024 年成为 Web 标准，跨浏览器兼容

## 验证测试

使用 2MB+ 图片测试：

| 方案 | 结果 |
|------|------|
| setTimeout + AbortController | write 阶段卡住 20+ 秒，超时未触发 |
| AbortSignal.timeout(2000) | 2 秒后正确抛出 TimeoutError |

```
⬇️ start downloading: https://example.com/image.png
⏱️ timeout (2s): https://example.com/image.png
```

## 总结

| 方案 | 网络请求 | 响应体读取 | 可靠性 |
|------|---------|-----------|--------|
| setTimeout + AbortController | ✅ | ⚠️ | 一般 |
| AbortSignal.timeout() | ✅ | ✅ | **推荐** |

这个问题在以下场景会暴露：

1. 下载大文件（响应体传输时间长）
2. 网络慢
3. 使用 Bun 运行时（某些版本存在边界问题）

建议直接使用 `AbortSignal.timeout()`，这是 Web 标准推荐的方式。
