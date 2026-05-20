#!/usr/bin/env node

import { existsSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { parseArgs } from "node:util"
import { downloadImages } from "./image-downloader.ts"
import {
  articlesToMarkdown,
  extractLinksToMarkdown,
  extractTenTabsArticles,
  extractWiseReadArticles,
  type IArticle,
  searchTenTabsEmail,
  searchWisereadsEmail,
} from "./parse-email.node.ts"

const __dirname = import.meta.dirname

function printCliUsage() {
  console.log(
    "Extract and save articles json and parse to markdown from Wisereads weekly email.\n",
  )
  console.log(
    "Usage: bun --env-file .opencode/skills/imap-smtp-email/.env .opencode/skills/wiseread-weekly-email-to-chinese-article/scripts/index.ts --vol=<volNum> [--title-with-url=true] [--download-images]",
  )
  console.log(
    "Example: bun --env-file .opencode/skills/imap-smtp-email/.env .opencode/skills/wiseread-weekly-email-to-chinese-article/scripts/index.ts --vol=6 --title-with-url=true",
  )
}

function parseCliArg() {
  try {
    const { values } = parseArgs({
      options: {
        vol: {
          type: "string",
        },
        help: {
          type: "boolean",
          default: false,
        },
        verbose: {
          type: "boolean",
          default: false,
        },
        "title-with-url": {
          type: "string",
        },
        "download-images": {
          type: "boolean",
          default: false,
        },
        "ten-tabs-subject": {
          type: "string",
        },
      },
    })

    // console.log(values)

    return values
  } catch (parseError) {
    // @ts-expect-error
    console.error("❌ 参数校验失败:", parseError.message)
    console.log("")
    printCliUsage()
    process.exit(1)
  }
}

main()

async function main() {
  const {
    vol: volNum = "",
    help,
    "title-with-url": titleWithUrl,
    "download-images": shouldDownloadImages,
    "ten-tabs-subject": tenTabsSubject,
  } = parseCliArg()

  if (help) {
    printCliUsage()
    process.exit(0)
  }

  // if not a number string or less than 1, throw error
  if (!/^\d+$/.test(volNum) || Number(volNum) < 1) {
    console.error(
      `Invalid volume number (${volNum}). Please provide a positive integer as the first argument.`,
    )
    console.log("")
    printCliUsage()

    process.exit(1)
  }

  if (!tenTabsSubject) {
    throw new Error("No --ten-tabs-subject provided.")
  }

  async function processWisereads(): Promise<string> {
    const mdPath = resolve(
      __dirname,
      `../../../../readwise-weekly/generated/${volNum}.md`,
    )
    if (existsSync(mdPath)) {
      console.log(
        `File (${mdPath}) already exists skipping Wisereads processing...`,
      )
      return dirname(mdPath)
    }

    const html = await searchWisereadsEmail(Number(volNum))
    const articles = extractWiseReadArticles(html)

    if (!articles?.length) {
      throw new Error(`No article extracted for vol. ${volNum}`)
    }

    return saveReadwiseArticles(
      volNum,
      articles,
      titleWithUrl !== "false",
      shouldDownloadImages ?? false,
    )
  }

  async function processTenTabs(subject: string) {
    const fileName = toKebabCase(subject)
    const outputPath = resolve(
      __dirname,
      `../../../../readwise-weekly-and-tentabs/generated/${fileName}.md`,
    )
    if (existsSync(outputPath)) {
      console.log(
        `File (${outputPath}) already exists skipping Ten Tabs processing...`,
      )
      return dirname(outputPath)
    }

    const html = await searchTenTabsEmail(subject)
    const articles = extractTenTabsArticles(html)

    if (!articles?.length) {
      throw new Error(`No article extracted for subject. ${subject}`)
    }

    return saveTenTabsArticles({
      subject: subject,
      articles,
    })
  }

  try {
    const [wisereadsDir, tenTabsDir] = await Promise.all([
      processWisereads(),
      processTenTabs(tenTabsSubject),
    ])
    // join 2 md files write to readwise-weekly-and-tentabs/generated/{vol}-{subject}.md
    const outputPath = join(
      tenTabsDir,
      `${volNum}-${toKebabCase(tenTabsSubject)}.md`,
    )

    const wisereadsMdPath = resolve(wisereadsDir, `${volNum}.md`)
    const tenTabsMdPath = resolve(
      tenTabsDir,
      `${toKebabCase(tenTabsSubject)}.md`,
    )

    const [wisereadsMd, tenTabsMd] = await Promise.all([
      readFile(wisereadsMdPath, "utf8"),
      readFile(tenTabsMdPath, "utf8"),
    ])

    const combinedMd = `${wisereadsMd}\n\n${tenTabsMd}`

    await writeFile(outputPath, combinedMd)
    console.log(`✅ Combined markdown saved to ${outputPath}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
    return
  }
}

async function saveReadwiseArticles(
  volNum: string,
  articles: IArticle[],
  titleWithUrl?: boolean,
  shouldDownloadImages?: boolean,
): Promise<string> {
  const outputPath = resolve(
    __dirname,
    `../../../../readwise-weekly/generated/${volNum}.json`,
  )
  const dir = dirname(outputPath)
  if (!existsSync(dir)) {
    throw new Error(`dir (${dir}) not exits`)
  }

  // 1. save json
  await writeFile(outputPath, JSON.stringify({ articles }, null, 2))
  console.log(`✅ articles json saved to ${outputPath}`)

  // 2. save markdown
  const md = articlesToMarkdown(articles, {
    titleWithUrl: titleWithUrl ?? true,
  })
  const mdPath = outputPath.replace(".json", ".md")
  await writeFile(mdPath, md)

  const zhMdPath = outputPath.replace(".json", ".zh.md")
  await writeFile(zhMdPath, "等待翻译")
  console.log(`✅ articles saved to ${zhMdPath}`)

  // 3. save links (only when titleWithUrl is false, since true embeds URLs in titles)
  if (!titleWithUrl) {
    const linksPath = outputPath.replace(".json", ".links.md")
    const linksMd = extractLinksToMarkdown(articles)

    await writeFile(linksPath, linksMd)
    console.log(`✅ articles links saved to ${linksPath}`)
  }

  // 4. Save images (only when --download-images is true)
  if (shouldDownloadImages) {
    await downloadImages(Number(volNum), articles)
  }

  return dir
}

async function saveTenTabsArticles({
  subject,
  articles,
}: {
  subject: string
  articles: IArticle[]
}): Promise<string> {
  const fileName = toKebabCase(subject)
  const outputPath = resolve(
    __dirname,
    `../../../../readwise-weekly-and-tentabs/generated/${fileName}.json`,
  )
  const dir = dirname(outputPath)
  if (!existsSync(dir)) {
    throw new Error(`dir (${dir}) not exits`)
  }

  // 1. save json
  await writeFile(outputPath, JSON.stringify({ articles }, null, 2))
  console.log(`✅ articles json saved to ${outputPath}`)

  // 2. save markdown
  const md = articlesToMarkdown(articles, {
    titleWithUrl: true,
  })
  const mdPath = outputPath.replace(".json", ".md")
  await writeFile(mdPath, md)

  console.log(`✅ articles saved to ${mdPath}`)

  return dir
}

function toKebabCase(str: string): string {
  return str
    .trim() // 去除首尾空格
    .toLowerCase() // 转小写
    .replace(/[^a-z0-9\s]/g, "") // 只保留字母、数字、空格
    .replace(/\s+/g, "-") // 空格转连字符
    .replace(/-+/g, "-") // 防止多个连字符
}

// const text = "Why Are We Always Charging Our Phone Batteries? "
// console.log(toKebabCase(text))
// 输出: "why-are-we-always-charging-our-phone-batteries"
