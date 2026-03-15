---
name: wiseread-weekly-email-to-chinese-article
description: Wiseread Weekly 中文文章生成工具。当让你生成 wisereads 某一期的中文文章时调用。
metadata: email, imap, parsing, markdown, chinese, article
---

# Wisereads Weekly Email to Chinese Article Tool

邮件内容 -> markdown -> 翻译成中文文章工具。

## Instructions

### Step1: 邮件转 markdown

根据期号搜索邮件并解析成 markdown 文章，调用下面脚本：

```bash
node --env-file ../imap-smtp-email/.env scripts/extract-articles.ts [--vol=132]
```

Options:
- `--vol <volNum>`: Wisereads vol number (**required** and should be positive integer)
- `--help`: Show cli usage (default: false)

假设用户输入 vol=132 则该脚本将自动搜索邮件并生成两个文件：`132.json` 和 `132.md` 保存在 `<root>/readwise-weekly/generated/`

### Step2: 英译中

1. 使用 Chrome Devtools MCP 打开网站 https://chat.deepseek.com/
2. 输入 Step1 生成的 markdown 文件内容，结合翻译要求，格式如下，点击确认发送按钮
```
翻译成中文文章，注意事项：

- 通俗易懂，多用短句，避免长句
- 中文和英文以及中文和数字之间必须有空格
- 无需翻译作者名、媒体平台
- `Twitter Thread` 翻译成 `Twitter` 即可。
- 无需翻译 `img` 的 `alt` 比如 `![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)` 的 `This is Water` 无需翻译

{markdown 内容}
```

3. 等待翻译完成后，点击 `Copy` 按钮，将翻译后的内容复制到剪贴板
4. 将翻译后内容放到 `<root>/readwise-weekly/generated/` 目录下，文件名为 `<volNum>.zh.md`
