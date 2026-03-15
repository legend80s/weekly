#!/usr/bin/env node

import { existsSync, writeFileSync } from "node:fs"
import { resolve as _resolve, dirname } from "node:path"
import { parseArgs } from "node:util"
import Imap from "imap"
import { simpleParser } from "mailparser"
import {
  articlesToMarkdown,
  extractArticles,
  type IArticle,
} from "./parse-email.node"

function printCliUsage() {
  console.log("Extract articles from Wisereads weekly email.\n")
  console.log(
    "Usage: node --env-file ../imap-smtp-email/.env extract-articles --vol=<volNum>",
  )
  console.log(
    "Example: node --env-file ../imap-smtp-email/.env extract-articles --vol=6",
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

  let articles: IArticle[] | undefined
  try {
    articles = await run(volNum)
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
  const outputPath = _resolve(
    __dirname,
    `../../../readwise-weekly/generated/${volNum}.json`,
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

async function run(volNum: string): Promise<IArticle[]> {
  const emailSubject = `Wisereads Vol. ${volNum}`

  const imapConfig = {
    user: process.env.IMAP_USER!,
    password: process.env.IMAP_PASS!,
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT),
    tls: process.env.IMAP_TLS === "true",
    tlsOptions: {
      rejectUnauthorized: process.env.IMAP_REJECT_UNAUTHORIZED !== "false",
    },
  }

  console.log("imapConfig:", imapConfig)

  // throw new Error("Not implemented")

  const imap = new Imap(imapConfig)

  return new Promise((resolve, reject) => {
    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err, box) => {
        if (err) {
          reject(err)
          return
        }

        imap.search([["SUBJECT", emailSubject]], (err, results) => {
          if (err) {
            reject(err)
            return
          }
          if (results.length === 0) {
            imap.end()
            reject(
              new RangeError(`No emails found by subject: ${emailSubject}`),
            )
            return
          }

          const f = imap.fetch(results[0], { bodies: [""] })

          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  reject(err)
                  return
                }

                const html = parsed.html || ""
                console.log("html email length:", html.length)

                // 如果 html 为空，则报错提醒
                if (!html) {
                  reject(new Error(`email vol ${volNum}'s html is empty`))
                  return
                }

                const articles = extractArticles(html)

                imap.end()
                resolve(articles)
              })
            })
          })
        })
      })
    })

    imap.on("error", reject)
    imap.connect()
  })
}
