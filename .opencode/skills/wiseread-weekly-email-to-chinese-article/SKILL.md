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

### Step2: 生成中文文章

Translate the weekly popular article recommendations markdown generated in Step 1 into Chinese articles. Notes:

- Place the translated articles in the `<root>/readwise-weekly/generated/` directory with the filename format `<volNum>.zh.md`
- Make them easy to understand, use simple short sentences, avoid long and complex sentences
- There must be spaces between Chinese and English, as well as between Chinese and numbers
- No need to translate author names, book titles, and media platforms
- Translate `Twitter Thread` to `Twitter` only.
- No need to translate the `alt` of `img`, for example, `This is Water` in `![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)` does not need translation
- However, the text of link `[text](link)` need translation. Example: `[The Musk Algorithm](https://world.hey.com/dhh/the-musk-algorithm-977bf312/)` should be translated to `[马斯克算法](https://world.hey.com/dhh/the-musk-algorithm-977bf312/)`.


### Step3: 检查文章翻译是否符合要求

按照 Step 2 的要求，逐条检查翻译后的文章是否符合要求。
