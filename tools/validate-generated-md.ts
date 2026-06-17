// bun validate-generated-md.ts <file_path>

import { createReadStream } from "node:fs"
import readlinePromises from "node:readline/promises"

main()

function main() {
  const filePath = process.argv[2]

  validate(filePath)
}

async function validate(filePath: string) {
  const fileStream = createReadStream(filePath)

  const rl = readlinePromises.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // 处理 Windows 和 Linux 换行符
  })

  let lineNumber = 0
  for await (const line of rl) {
    lineNumber++
    // 在这里处理每一行
    //
    if (line.trim() === "---") {
      console.log(`#${lineNumber}:`, line)
      console.log(`#${lineNumber}:`, line)
      console.log(`#${lineNumber}:`, line)
      throw new Error(
        `第 ${lineNumber} 行：生成的 markdown 不能有分割线 \`---\``,
      )
    }
  }
}
