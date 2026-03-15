#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { resolve as _resolve, dirname } from "node:path"
import { parseArgs } from "node:util"
// import dotenv from "dotenv"
import Imap from "imap"
import { simpleParser } from "mailparser"

// dotenv.config({ path: _resolve(__dirname, "../.env") })

function getCoverImageUrlsInSection(html, startIdx, endIdx) {
  const sectionHtml = html.substring(startIdx, endIdx)
  const urls = []
  const regex = /src="(https:\/\/readwise-assets[^"]*cover_image[^"]*)"/gi
  let match
  while ((match = regex.exec(sectionHtml)) !== null) {
    urls.push(match[1])
  }
  return urls
}

function extractArticles(text, html) {
  const sectionMarkers = [
    { name: "article", pattern: "h-article", text: "Articles of the Week" },
    { name: "twitter", pattern: "h-twitter", text: "Tweet of the Week" },
    { name: "pdf", pattern: "h-pdf", text: "PDF of the Week" },
    { name: "book", pattern: "h-book", text: "Book of the Week" },
    { name: "video", pattern: "h-yt", text: "Video of the Week" },
    { name: "feed", pattern: "h-rss", text: "Feed of the Week" },
  ]

  const sectionPositions = []
  for (const marker of sectionMarkers) {
    const idx = html.indexOf(marker.pattern)
    sectionPositions.push({ ...marker, htmlIdx: idx })
  }

  sectionPositions.sort((a, b) => a.htmlIdx - b.htmlIdx)

  const categoryImgMap = {}
  for (let i = 0; i < sectionPositions.length; i++) {
    const section = sectionPositions[i]
    if (section.htmlIdx === -1) continue

    const nextIdx =
      i < sectionPositions.length - 1
        ? sectionPositions[i + 1].htmlIdx
        : html.length
    const urls = getCoverImageUrlsInSection(html, section.htmlIdx, nextIdx)
    categoryImgMap[section.text] = urls
  }

  console.log("Category images:", JSON.stringify(categoryImgMap, null, 2))

  const result = []

  const textSectionNames = [
    "Articles of the Week",
    "Tweet of the Week",
    "PDF of the Week",
    "Book of the Week",
    "Video of the Week",
    "Feed of the Week",
  ]
  const textCategoryMap = {
    "Articles of the Week": "article",
    "Tweet of the Week": "twitter",
    "PDF of the Week": "pdf",
    "Book of the Week": "book",
    "Video of the Week": "video",
    "Feed of the Week": "feed",
  }

  for (let i = 0; i < textSectionNames.length; i++) {
    const sectionName = textSectionNames[i]

    const sectionStart = text.indexOf("## " + sectionName)
    if (sectionStart === -1) continue

    let sectionEnd
    if (i < textSectionNames.length - 1) {
      sectionEnd = text.indexOf("## " + textSectionNames[i + 1])
    } else {
      sectionEnd = text.indexOf("\n\nUnsubscribe")
    }
    if (sectionEnd === -1) sectionEnd = text.length

    const sectionText = text.substring(sectionStart, sectionEnd)
    const articleBlocks = sectionText.split("\n### ").slice(1)

    const subArticles = []
    const sectionImgUrls = categoryImgMap[sectionName] || []

    for (let j = 0; j < articleBlocks.length; j++) {
      const block = articleBlocks[j]
      const lines = block.split("\n")
      const title = lines[0].trim()
      if (!title) continue

      let url = ""
      for (const line of lines) {
        if (line.includes("https://")) {
          const urlMatch = line.match(/(https:\/\/[^\s]+)/)
          if (urlMatch && !url) url = urlMatch[1]
        }
      }

      const summaryLines = []
      for (let k = 1; k < lines.length; k++) {
        const line = lines[k].trim()
        if (line && !line.startsWith("https://")) {
          summaryLines.push(line)
        }
      }
      const summary = summaryLines.join(" ")

      const authorMatch = block.match(/·\s*([^·\n]+)\s*·\s*(\d+\s*minutes?)/i)
      const author = authorMatch ? authorMatch[1].trim() : ""

      const img = sectionImgUrls[j] || ""

      if (url) {
        subArticles.push({
          title,
          url,
          img,
          summary,
          author: author || undefined,
        })
      }
    }

    if (subArticles.length > 0) {
      result.push({
        category: textCategoryMap[sectionName],
        subArticles,
      })
    }
  }

  return result
}

function printCliUsage() {
  console.log("Extract articles from Wisereads weekly email.\n")
  console.log("Usage: node extract-articles.js --vol=<volNum>")
  console.log("Example: node extract-articles.js --vol=6")
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
    console.error("❌ 参数校验失败:", parseError.message)
    console.log("")
    printCliUsage()
    process.exit(1)
  }
}

main()

function main() {
  const { vol: volNum, help } = parseCliArg()

  if (help) {
    printCliUsage()
    process.exit(0)
  }

  run(volNum).catch(console.error)
}

/**
 * @param {string} volNum
 * @returns {Promise<void>}
 */
async function run(volNum) {
  // if not a number string or less than 1, throw error
  if (!/^\d+$/.test(volNum) || Number(volNum) < 1) {
    throw new Error(
      `Invalid volume number (${volNum}). Please provide a positive integer as the first argument.`,
    )
  }

  const emailSubject = `Wisereads Vol. ${volNum}`

  const imapConfig = {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT),
    tls: process.env.IMAP_TLS === "true",
    tlsOptions: {
      rejectUnauthorized: process.env.IMAP_REJECT_UNAUTHORIZED !== "false",
    },
  }

  console.log("imapConfig:", imapConfig)

  throw new Error("Not implemented")

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

                const text = parsed.text || ""
                const html = parsed.html || ""
                console.log("text:", text)
                console.log("text length:", text.length)
                console.log("html length:", html.length)

                throw new Error("stop")

                const articles = extractArticles(text, html)

                const outputPath = _resolve(
                  __dirname,
                  `../../../readwise-weekly/generated/${volNum}.json`,
                )
                const dir = dirname(outputPath)
                if (!existsSync(dir)) {
                  mkdirSync(dir, { recursive: true })
                }

                writeFileSync(outputPath, JSON.stringify({ articles }, null, 2))
                console.log(`Saved to ${outputPath}`)
                console.log(JSON.stringify({ articles }, null, 2))

                imap.end()
                resolve({ articles })
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
