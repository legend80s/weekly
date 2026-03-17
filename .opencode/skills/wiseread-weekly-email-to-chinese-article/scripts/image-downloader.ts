import { createWriteStream } from "node:fs"
import { basename } from "node:path"
import { pipeline } from "node:stream/promises"
// import { promisify } from "node:util"

// const streamPipeline = promisify(pipeline)

/**
 * `https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/avoiding-stupidity-is-easier-t/cover_image.png` =>
 * `avoiding-stupidity-is-easier-t.png`
 */
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

  const filename = `${name}.${ext}`

  return filename
}

export async function downloadImage(
  url: string,
  destPath: string,
): Promise<boolean> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn(`❌ failed to download ${url}: ${response.status}`)
      return false
    }
    await pipeline(response.body!, createWriteStream(destPath))
    console.log(`📥 downloaded: ${basename(destPath)}`)
    return true
  } catch (err) {
    console.warn(`❌ failed to download ${url}:`, err)

    return false
  }
}
