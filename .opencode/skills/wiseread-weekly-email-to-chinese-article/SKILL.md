---
name: wiseread-weekly-email-to-chinese-article
description: Wiseread Weekly 中文文章生成工具。当让你生成 wisereads 某一期的中文文章时调用。
metadata: email, imap, parsing, markdown, chinese, article
---

# Wisereads Weekly Email to Chinese Article Tool

邮件内容 -> markdown -> 翻译成中文文章工具。

## Instructions

### Step1: 邮件转 markdown

如果已有 `[volNum].md` 则无需调用。根据期号搜索邮件并解析成 markdown 文章，脚本使用方式如下：

```bash
node --env-file .opencode/skills/imap-smtp-email/.env .opencode/skills/wiseread-weekly-email-to-chinese-article/scripts/extract-articles.ts [--vol=volNum]
```

Options:
- `--vol <volNum>`: Wisereads vol number (**required** and should be positive integer)
- `--help`: Show cli usage (default: false)

假设用户输入 vol=132 则该脚本将自动搜索邮件并生成两个文件：`132.json` 和 `132.md` 保存在 `<root>/readwise-weekly/generated/`

### Step2: 使用 DeepSeek 网站英译中

> 因为 DeepSeek 网站的回复质量是所有 AI 中最好，比如它的英译中质量。

1. 使用 Chrome Devtools MCP（如果没有请安装到本项目）打开网站 https://chat.deepseek.com/。
2. 构建翻译 prompt：将 Step1 生成的 markdown 文件内容结合下面的翻译要求，生成 `content` 格式如下：

```md
将『英语每周推荐阅读』翻译成中文。

## 注意事项

- 通俗易懂，多用短句，避免长句。
- 中文和英文以及中文和数字之间必须有空格。
- 无需翻译作者名、媒体平台。
- `Twitter Thread` 翻译成 `Twitter` 即可。
- 无需翻译 `img` 的 `alt` 比如 `![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)` 的 `This is Water` 无需翻译。
- 需翻译 `link` 里面的 `text` 比如 `[This is Water](https://example.com)` 的 `This is Water` 需翻译。

## 行文风格

**核心指令** 请按照以下要求撰写技术资讯：

**一、语言风格（必须严格遵守）**
1.  **口语化表达**：多用『折腾』、『琢磨』、『大招』、『搞到手』、『堵死』等生活化词汇，避免过于书面或学术。
2.  **短句为主**：句子要短，多用冒号、分号连接，制造快节奏的阅读体验。例如：『数据变更有了专门的 action()，还支持乐观更新。』
3.  **技术细节穿插比喻**：在解释技术点时，偶尔用通俗的类比，如『纯靠数字压人』。
4.  **略带点评色彩**：在介绍完事实后，可以加一句简短的评论或提醒，如：『老项目升级的话改动会比较大』、『提前看看少头疼』。

**二、内容结构（模仿示例）**
1.  **开头即核心**：第一句话直接抛出最重要的信息（谁、干了什么、发布了什么）。
2.  **功能点罗列**：用冒号或分号快速罗列关键更新或核心观点。
3.  **上下文衔接**：用『受...启发』、『利用这点』等词，自然连接事件或技术点。

**三、格式要求**
1.  技术名词、代码、版本号前后需有空格（如：Solid 2.0、z-index 令牌）。
2.  涉及链接时，用『官方给了[迁移指南](url)』或『文章把过程讲得很细』这种自然的方式带出。

这套提示词的核心在于**节奏感**——像朋友聊天一样把技术干货抖出来。

---

### 示例：如何将你的提示词应用到新素材

假设要讲述「React 19 正式支持 Web Components」这条新闻，你会这样写：

> React 19 终于对 Web Components 敞开大门了：现在直接在 React 里用自定义元素，属性传递、事件监听都原生支持，不用再包一层 `ref` 手动绑。
>
> 之前大家自己写的那些「桥接组件」可以退休了，官方实现不仅更稳，还能配合 Server Components 一起用。


## 翻译内容
待翻译『英语每周推荐阅读』内容如下：

{**完整**的 `[volNum].md` 文件内容}
```

3. 使用 chrome-devtools_evaluate_script 执行 JavaScript 代码（**须严格按照以下代码执行**），将 `content` 设置到 textarea 中，并触发 input 事件以及点击发送，代码如下：

```js
const textarea = document.querySelector('textarea');
const sendButton = document.querySelector('[role="button"][aria-disabled=true]')

// Use Object.getOwnPropertyDescriptor to get the native setter
const descriptor = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value');
const content = `content`;
// Use the native setter
descriptor.set.call(textarea, content);

// Dispatch the input event
textarea.dispatchEvent(new Event('input', { bubbles: true }));

// 点击发送按钮
setTimeout(() => {
  sendButton.click();
  console.log('send button clicked')
}, 32)
```

6. 如果 console 没有输出 `send button clicked`，则需再次点击发送按钮：`[...document.querySelectorAll('[role="button"][aria-disabled=false]')].at(-1).click()`
7. 等待回复完成（一般耗时 50s）：**每隔 10s 轮询截图一次**，当页面出现『This response is AI-generated, for reference only.』说明回复已完成
8. 提取翻译结果并将**完整**的 markdown 回复存放到 `<root>/readwise-weekly/generated/` 目录下，文件名为 `<volNum>.zh.md`
