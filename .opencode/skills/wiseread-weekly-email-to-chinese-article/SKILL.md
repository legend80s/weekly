---
name: wiseread-weekly-email-to-chinese-article
description: search my email for subject of Wiseread Weekly and generate a Chinese article based on the email content.
metadata: email, imap, parsing, markdown, chinese, article
---

# Wiseread Weekly Email to Chinese Article Tool

当用户让你生成某一期 Wiseread Weekly 的文章时，调用 `imap-smtp-email` skill 搜索主题为 “Wisereads Vol 132”（必须让用户输入 vol 此处假设输入 132）

邮件内容中提取文章信息，并生成一篇中文文章。请确保中文和英文以及中文和数字之间有空格。

文章结构参考 [5.zh.md](../../../readwise-weekly/generated/5.zh.md)

文件名序号在现有生成文档的基础上加 1，例如现有 5.zh.md，则新文件名为 6.zh.md，文章内标题序号也相应递增。

## Instructions

1. 
读取文章结构参考 [5.zh.md](../../../readwise-weekly/generated/5.zh.md)
2. 如果用户没有提供期号，询问要生成哪一期的 Wiseread Weekly，期号必须，假设用户输入 `132`
3. 调用 `imap-smtp-email` skill 搜索主题为 “Wisereads Vol 132” 的邮件，提取完整邮件内容
4. 生成一篇**通俗易懂**中文文章，结构和第 1 步中的相同，放入 `readwise-weekly/generated/{index}.zh.md` 文件中
5. 注意期号和生成的文件名里面的序号没有任何关系，因为期号由用户输入，而文件名序号是递增的。
6. 关于图片地址：应该严格使用邮件中的图片地址不要做任何修改，且需要检查图片链接的可访问性，防止出现图片无法展示问题。
