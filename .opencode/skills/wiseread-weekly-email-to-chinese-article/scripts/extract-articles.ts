#!/usr/bin/env node

import { existsSync, writeFileSync } from "node:fs"
import { resolve as _resolve, dirname } from "node:path"
import { parseArgs } from "node:util"

import {
  articlesToMarkdown,
  extractArticles,
  type IArticle,
  searchWisereadsEmail,
} from "./parse-email.node.ts"

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

    saveArticles(volNum, articles)
  } catch (err) {
    console.error(err)
    process.exit(1)
    return
  }
}

function saveArticles(volNum: string, articles: IArticle[]) {
  const __dirname = import.meta.dirname
  const outputPath = _resolve(
    __dirname,
    `../../../../readwise-weekly/generated/${volNum}.json`,
  )
  const dir = dirname(outputPath)
  if (!existsSync(dir)) {
    throw new Error(`dir (${dir}) not exits`)
  }

  writeFileSync(outputPath, JSON.stringify({ articles }, null, 2))
  console.log(`✅ articles json saved to ${outputPath}`)
  // console.log(JSON.stringify({ articles }, null, 2))
  // save markdown
  const md = articlesToMarkdown(articles)
  const mdPath = outputPath.replace(".json", ".md")
  writeFileSync(mdPath, md)
  console.log(`✅ articles markdown saved to ${mdPath}`)
}
