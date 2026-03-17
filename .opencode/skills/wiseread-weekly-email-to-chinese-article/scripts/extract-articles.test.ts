import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import test, { describe } from "node:test"
import {
  articlesToMarkdown,
  extractArticles,
  searchWisereadsEmail,
} from "./parse-email.node.ts"

describe("E2E", () => {
  test("E2E: search parse and to markdown", async (t) => {
    const html = await searchWisereadsEmail(8)
    const articles = extractArticles(html)

    const md = articlesToMarkdown(articles)

    const expected = readFileSync("./readwise-weekly/generated/8.json", "utf-8")
    const actual = JSON.stringify(
      {
        articles,
      },
      null,
      2,
    )

    assert.deepEqual(actual, expected)

    const expectedMd = readFileSync("./readwise-weekly/generated/8.md", "utf-8")

    assert.deepEqual(md, expectedMd)
  })
})
