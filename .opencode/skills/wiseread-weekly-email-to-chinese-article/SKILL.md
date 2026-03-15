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
翻译成中文文章，注意事项：
- 通俗易懂，多用短句，避免长句
- 中文和英文以及中文和数字之间必须有空格
- 无需翻译作者名、媒体平台
- `Twitter Thread` 翻译成 `Twitter` 即可
- 无需翻译 `img` 的 `alt` 比如 `![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)` 的 `This is Water` 无需翻译

{**完整**的 `[volNum].md` 文件内容}
```

3. 使用 chrome-devtools_evaluate_script 执行 JavaScript 代码，将 `content` 设置到 textarea 中，并触发 input 事件，代码如下：

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
})
```

5. 等待回复完成：等页面出现『This response is AI-generated, for reference only.』说明回复已完成
6. 提取翻译结果并将**完整**的 markdown 回复存放到 `<root>/readwise-weekly/generated/` 目录下，文件名为 `<volNum>.zh.md`
