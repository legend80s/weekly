#!/usr/bin/env bun
// import { Bun } from 'bun';

import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, statSync } from "node:fs"
import { basename, resolve } from "node:path"
import { parseArgs } from "node:util"
import sharp from "sharp"
import type { IArticle } from "./parse-email.node"

// const SIZE_THRESHOLD = 300 * 1024 // 2MB
const SIZE_THRESHOLD = 2 * 1024 * 1024 // 2MB
const TIMEOUT_MS = 30_000 // 30s

const debugging = false

export function extractImageFilename(imgUrl: string): string {
  const pathname = new URL(imgUrl).pathname
  const ext = basename(pathname).split(".").pop()
  if (!ext) {
    throw new Error(`cannot extract ext from ${imgUrl}`)
  }

  const splits = pathname.split("/")
  const name = splits.at(-2)
  if (!name) {
    throw new Error(`cannot extract name from ${imgUrl}`)
  }

  return `${name}.${ext}`
}

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  const start = Date.now()

  console.time(`download ${basename(destPath)}`)
  debugging && console.time(`fetch ${url}`)
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    debugging && console.timeEnd(`fetch ${url}`)

    debugging && console.time(`Bun.write ${url}`)
    await Bun.write(destPath, await response.blob())
    debugging && console.timeEnd(`Bun.write ${url}`)
    console.timeEnd(`download ${basename(destPath)}`)

    const stats = statSync(destPath)
    if (stats.size > SIZE_THRESHOLD) {
      const originalSize = stats.size

      try {
        await compress(destPath)
      } catch (err: any) {
        console.warn(`⚠️ compression failed, keep original: ${err.message}`)
        console.warn(
          `⚠️ large file (${(originalSize / 1024 / 1024).toFixed(2)}MB): ${basename(destPath)}`,
        )
      }
    } else {
      // console.log(`📥 downloaded: ${basename(destPath)}`)
    }
    return true
  } catch (err: any) {
    const elapsed = Date.now() - start
    if (err.name === "TimeoutError") {
      console.warn(
        `[${new Date().toISOString()}] ❌ timeout after ${elapsed}ms: ${url}`,
      )
    } else {
      console.warn(
        `[${new Date().toISOString()}] ❌ error after ${elapsed}ms: ${err.message}`,
      )
    }
    return false
  }
}

type IDownloadResult = {
  url: string
  success: boolean
}

async function downloadImagesCore(
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
      if (sub.img?.startsWith("http")) {
        const imgUrl = sub.img
        const filename = extractImageFilename(imgUrl)
        const localPath = resolve(imgDir, filename)

        if (existsSync(localPath)) {
          console.log(`⏭️  skip existing: ${filename}`)
          continue
        }

        const promise = downloadImage(imgUrl, localPath).then((success) => ({
          success,
          url: imgUrl,
        }))
        fetchPromises.push(promise)
      } else {
        console.error("img url not starts with http")
      }
    }
  }

  return Promise.all(fetchPromises)
}

if (import.meta.main) {
  const { values } = parseArgs({
    options: {
      vol: {
        type: "string",
      },
    },
  })

  const { vol: volNum = "" } = values

  if (!/^\d+$/.test(volNum) || Number(volNum) < 1) {
    console.error(
      `Invalid volume number (${volNum}). Please provide a positive integer as the first argument.`,
    )
    console.log("")
    process.exit(1)
  }

  const result = await import(
    `../../../../readwise-weekly/generated/${volNum}.json`,
    {
      with: { type: "json" },
    }
  )

  const articles = result.default.articles

  if (!articles.length) {
    console.error("❌ import result:", result)
    throw new Error(
      `❌ 如果该文件本单独调用，只需要先有 ${volNum}.json 文件，且非空`,
    )
  }

  await downloadImages(Number(volNum), articles)
}

export async function downloadImages(
  volNum: number,
  articles: IArticle[],
): Promise<void> {
  const imgDir = resolve(
    process.env.HOME || process.env.USERPROFILE || "",
    "Downloads/a配图",
    String(volNum),
  )

  console.log(`Images download dir`, imgDir)
  const start = Date.now()
  const result = await downloadImagesCore(articles, imgDir)

  const successList = result.filter((item) => item.success)
  const failedList = result
    .filter((item) => !item.success)
    .map((item) => item.url)

  console.log(`✅ success count ${successList.length}`)
  if (failedList.length) {
    console.log(`❌ Failed count ${failedList.length}:`)
    console.log(failedList)
    console.log("You can open them in browser and save them yourself")
    failedList.forEach((url) => {
      spawnSync("open", [url])
    })
  }
  const duration = `${((Date.now() - start) / 1000).toFixed(2)}s`
  console.log(`${result.length} images finished:`, duration)
}

export async function compress(destPath: string) {
  const stats = statSync(destPath)
  const originalSize = stats.size

  debugging && console.time("Bun.file costs")
  const buffer = await Bun.file(destPath).arrayBuffer()
  debugging && console.timeEnd("Bun.file costs")

  let compressed: Buffer<ArrayBufferLike>
  const ext = basename(destPath).split(".").pop()?.toLowerCase()

  // console.time(`compress ${destPath}`) // 60.78ms
  if (ext === "png") {
    compressed = await sharp(buffer).webp().toBuffer()
  } else if (ext === "jpg" || ext === "jpeg") {
    compressed = await sharp(buffer).jpeg({ quality: 80 }).toBuffer()
  } else if (ext === "webp") {
    compressed = await sharp(buffer).webp({ quality: 80 }).toBuffer()
  } else {
    compressed = await sharp(buffer).jpeg({ quality: 80 }).toBuffer()
  }
  // console.timeEnd(`compress ${destPath}`)
  console.log(originalSize, `=>`, compressed.length)

  if (compressed.length < originalSize) {
    // a.png => a-compress.png
    const [head, ext] = destPath.split(".")
    const destCompressedPath = `${head}-compressed.${ext}`

    await Bun.write(destCompressedPath, compressed)
    const saved = ((1 - compressed.length / originalSize) * 100).toFixed(1)
    console.log(
      `📦 compressed ${saved}%: ${(originalSize / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB - ${basename(destPath)}`,
    )
  } else {
    console.warn(
      `⚠️ large file (${(originalSize / 1024 / 1024).toFixed(2)}MB): ${basename(destPath)}`,
    )
  }
}
