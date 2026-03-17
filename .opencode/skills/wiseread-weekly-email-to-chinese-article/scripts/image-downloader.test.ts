import { strict as assert } from "node:assert"
import test from "node:test"

import { extractImageFilename } from "./image-downloader.ts"

test("success", () => {
  const actual = extractImageFilename(
    `https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/avoiding-stupidity-is-easier-t/cover_image.png`,
  )

  const expected = `avoiding-stupidity-is-easier-t.png`

  assert.deepEqual(actual, expected)
})
