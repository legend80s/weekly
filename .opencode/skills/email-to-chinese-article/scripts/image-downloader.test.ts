import { strict as assert } from "node:assert"
import test from "node:test"

import { compress, extractImageFilename } from "./image-downloader.ts"

test("success", () => {
  const actual = extractImageFilename(
    `https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/avoiding-stupidity-is-easier-t/cover_image.png`,
  )

  const expected = `avoiding-stupidity-is-easier-t.png`

  assert.deepEqual(actual, expected)
})

test("compress", async () => {
  console.time("compress")
  await compress("/Users/legend80s/Downloads/a配图/9-2/2-by-michael-easter.png")
  console.timeEnd("compress")
})
