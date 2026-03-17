#!/usr/bin/env node

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs"
import { resolve as _resolve, basename, dirname } from "node:path"
import { pipeline } from "node:stream"
import { parseArgs, promisify } from "node:util"

import {
  articlesToMarkdown,
  extractArticles,
  extractLinksToMarkdown,
  type IArticle,
  searchWisereadsEmail,
} from "./parse-email.node.ts"

const streamPipeline = promisify(pipeline)

function printCliUsage() {
  console.log(
    "Extract and save articles json and parse to markdown from Wisereads weekly email.\n",
  )
  console.log(
    "Usage: node --env-file ../imap-smtp-email/.env scripts/extract-articles.ts --vol=<volNum>",
  )
  console.log(
    "Example: node --env-file ../imap-smtp-email/.env scripts/extract-articles.ts --vol=6",
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
  const { vol: volNum = "", help } = parseCliArg()

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

  try {
    const html = await searchWisereadsEmail(Number(volNum))
    const articles = extractArticles(html)

    if (!articles?.length) {
      throw new Error(`No article extracted for vol. ${volNum}`)
    }

    await saveArticles(volNum, articles)
  } catch (err) {
    console.error(err)
    process.exit(1)
    return
  }
}

async function saveArticles(volNum: string, articles: IArticle[]) {
  const __dirname = import.meta.dirname
  const outputPath = _resolve(
    __dirname,
    `../../../../readwise-weekly/generated/${volNum}.json`,
  )
  const dir = dirname(outputPath)
  if (!existsSync(dir)) {
    throw new Error(`dir (${dir}) not exits`)
  }

  // 1. download images first
  const imgDir = _resolve(
    process.env.HOME || process.env.USERPROFILE || "",
    "Downloads/a配图",
    volNum,
  )
  downloadImages(articles, imgDir).then((result) => {
    console.log(`Download dir`, imgDir)
    const successList = result.filter((item) => item.success)
    const failedList = result
      .filter((item) => !item.success)
      .map((item) => item.url)

    console.log(`✅ success count ${successList.length}`)
    console.log(`❌ Failed count ${failedList.length}:`)
    console.log(`  ${failedList}`)
  })

  // 2. save json
  writeFileSync(outputPath, JSON.stringify({ articles }, null, 2))
  console.log(`✅ articles json saved to ${outputPath}`)

  // 3. save markdown
  const md = articlesToMarkdown(articles)
  const mdPath = outputPath.replace(".json", ".md")
  writeFileSync(mdPath, md)
  console.log(`✅ articles saved to ${mdPath}`)

  // 4. save links
  const linksPath = outputPath.replace(".json", ".links.md")
  const linksMd = extractLinksToMarkdown(articles)

  writeFileSync(linksPath, linksMd)
  console.log(`✅ articles links saved to ${linksPath}`)
}

type IDownloadResult = {
  url: string
  success: boolean
}
async function downloadImages(
  articles: IArticle[],
  imgDir: string,
): Promise<IDownloadResult[]> {
  if (!existsSync(imgDir)) {
    mkdirSync(imgDir, { recursive: true })
    console.log(`📁 created directory: ${imgDir}`)
  }

  const fetchPromises: Promise<IDownloadResult>[] = []

  for (const article of articles) {
    for (const sub of article.subArticles) {
      if (sub.img && sub.img.startsWith("http")) {
        const imgUrl = sub.img
        const ext = basename(new URL(imgUrl).pathname).split(".").pop() || "jpg"
        const filename = `${Buffer.from(sub.title).toString("base64url").slice(0, 50)}.${ext}`
        const localPath = _resolve(imgDir, filename)

        if (existsSync(localPath)) {
          console.log(`⏭️  skip existing: ${filename}`)
          continue
        }

        const promise = downloadImage(imgUrl, localPath).then((success) => ({
          success,
          url: imgUrl,
        }))
        fetchPromises.push(promise)
      }
    }
  }

  return Promise.all(fetchPromises)
}

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn(`❌ failed to download ${url}: ${response.status}`)
      return false
    }
    await streamPipeline(response.body!, createWriteStream(destPath))
    console.log(`📥 downloaded: ${basename(destPath)}`)
    return true
  } catch (err) {
    console.warn(`❌ failed to download ${url}:`, err)

    return false
  }
}
