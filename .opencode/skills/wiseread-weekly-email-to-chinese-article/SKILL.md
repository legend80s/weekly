---
name: wiseread-weekly-email-to-chinese-article
description: Wiseread Weekly 每周推荐阅读中文文章生成工具。当让你生成或翻译 readwise 或 wisereads 某一期的中文文章时调用。
metadata: email, imap, parsing, markdown, chinese, article
---

# Wisereads Weekly Email to Chinese Article Tool

邮件内容 -> markdown -> 翻译成中文文章。

## Instructions

### Step1: 邮件转 markdown

假设用户输入期号 132 则该脚本将自动搜索邮件并生成文件 `132.md` 保存在 `readwise-weekly/generated/`。

如果已有 `readwise-weekly/generated/[volNum].md` 则本步骤可跳过。

根据期号搜索邮件并解析成 markdown 文章，脚本使用方式如下：

```bash
bun --env-file .opencode/skills/imap-smtp-email/.env .opencode/skills/wiseread-weekly-email-to-chinese-article/scripts/index.ts [--vol=volNum]
```

Options:
- `--vol <volNum>`: Wisereads vol number (**required** and should be positive integer)
- `--title-with-url <true|false>`: Whether to include article URLs in markdown titles (default: true)
- `--download-images`: 是否下载文章内图片 (default: false)

注意：必须执行脚本之前需询问是否下载文章内图片，如果肯定回答则增加 `--download-images`

### Step2: 生成中文文章

第一步生成的 `readwise-weekly/generated/[volNum].md` 翻译成中文，存放到 `readwise-weekly/generated/<volNum>.zh.md`

#### 行文风格

**核心指令** 请按照以下要求撰写技术资讯：

一、语言风格
1.  **短句为主**：句子要短，多用冒号、分号连接，制造快节奏的阅读体验。例如：『数据变更有了专门的 action()，还支持乐观更新。』

二、内容结构（模仿示例）
2.  功能点罗列：用冒号或分号快速罗列关键更新或核心观点。
3.  上下文衔接：用『受...启发』、『利用这点』等词，自然连接事件或技术点。

三、格式要求
1. 中文和英文以及中文和数字之间必须有空格。
2. 涉及链接时，用『官方给了[迁移指南](url)』或『文章把过程讲得很细』这种自然的方式带出。
3. 无需翻译作者名、媒体平台。
4. `Twitter Thread` 翻译成 `Twitter` 即可。
5. 无需翻译 `img` 的 `alt` 比如 `![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)` 的 `This is Water` 无需翻译。
6. 需翻译 `link` 里面的 `text` 比如 `[This is an example](https://example.com)` 的 `This is an example` 需翻译。

这套提示词的核心在于**节奏感**——像朋友聊天一样把技术干货抖出来。

#### 示例：如何将你的提示词应用到新素材

假设要讲述「React 19 正式支持 Web Components」这条新闻，你会这样写：

> React 19 终于对 Web Components 敞开大门了：现在直接在 React 里用自定义元素，属性传递、事件监听都原生支持，不用再包一层 `ref` 手动绑。
>
> 之前大家自己写的那些「桥接组件」可以退休了，官方实现不仅更稳，还能配合 Server Components 一起用。


#### 后处理

1. 翻译后的文章头部增加吸引读者兴趣的导读：『**欢迎打开本期国外技术周刊**：<请续写>』
  - 开头即核心：第一句话直接抛出最重要的信息（谁、干了什么、发布了什么）
  - 记住导读只需推荐**<= 3 篇**读者最可能感兴趣的即可。

2. 翻译后的文章头部增加标题：『# 国外技术周刊 #{volNum}：<请填充>』填充内容是最吸引人的**1 篇**文章

3. 标题和导读之后，增加一个章节，介绍本文的**1个**观点：
  - 生成之前先列出所有趣发人深省的观点或文章，等我确认后再继续。行文风格参考：[brief-view-of-the-week.md](.opencode\skills\wiseread-weekly-email-to-chinese-article\references\brief-view-of-the-week.md)
  - 字数 800 字以内。
