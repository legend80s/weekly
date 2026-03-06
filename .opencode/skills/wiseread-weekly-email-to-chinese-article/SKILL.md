---
name: wiseread-weekly-email-to-chinese-article
description: search my email for subject of Wiseread Weekly and generate a Chinese article based on the email content.
metadata: email, imap, parsing, markdown, chinese, article
---

# Wiseread Weekly Email to Chinese Article Tool

当用户让你生成某一期 Wiseread Weekly 的文章时，调用 imap-smtp-email skill 搜索主题为 “Wisereads Vol 132”（必须让用户输入 vol 此处假设输入 132）

邮件内容中提取文章信息，并生成一篇中文文章。请确保中文和英文以及中文和数字之间有空格。

文章结构参考 [5.zh.md](../../../readwise-weekly/generated/5.zh.md)

文件名序号在现有生成文档的基础上加 1，例如现有 5.zh.md，则新文件名为 6.zh.md。
