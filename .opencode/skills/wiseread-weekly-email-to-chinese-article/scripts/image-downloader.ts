import { existsSync, mkdirSync, statSync } from "node:fs"
import { basename, resolve } from "node:path"
import { parseArgs } from "node:util"
import type { IArticle } from "./parse-email.node"

const SIZE_THRESHOLD = 2 * 1024 * 1024 // 2MB
const TIMEOUT_MS = 30 * 1000 // 30s

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
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)

    if (!response.ok) {
      console.warn(`❌ failed to download ${url}: ${response.status}`)
      return false
    }
    // @ts-expect-error
    await Bun.write(destPath, response)
    const stats = statSync(destPath)
    if (stats.size > SIZE_THRESHOLD) {
      console.warn(`⚠️ large file (${(stats.size / 1024 / 1024).toFixed(2)}MB): ${basename(destPath)}`)
    } else {
      console.log(`📥 downloaded: ${basename(destPath)}`)
    }
    return true
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.warn(`⏱️ timeout (${TIMEOUT_MS / 1000}s): ${url}`)
    } else {
      console.warn(`❌ failed to download ${url}:`, err)
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
    console.log(`  ${failedList}`)
  }
  const duration = `${((Date.now() - start) / 1000).toFixed(2)}s`
  console.log(`${result.length} images download:`, duration)
}
