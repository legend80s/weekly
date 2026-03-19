import { statSync } from "node:fs"
import { basename } from "node:path"
import sharp from "sharp"

// const SIZE_THRESHOLD = 300 * 1024 // 2MB

const debugging = false

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

if (import.meta.main) {
  const imgPath = process.argv[2]

  if (!imgPath) {
    console.error("bun run image-compress.ts <img-path>")
    process.exit(1)
  }

  // console.log("imgPath:", imgPath)
  compress(imgPath)
}
