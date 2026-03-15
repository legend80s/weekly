import * as cheerio from "cheerio"

export type IArticle = {
  category: string
  subArticles: {
    title: string
    url: string | undefined
    img: string | undefined
    summary: string
    media: string
    author: string | undefined
  }[]
}

export function extractArticles(html: string): IArticle[] {
  // const htmlPath = path.join(process.cwd(), "./readwise-weekly/src/vol-132.html")
  // console.log("htmlPath:", htmlPath)
  // const html = readFileSync(htmlPath, "utf-8")
  // console.log("html:", html.length)

  const $ = cheerio.load(html)

  // const $$ = (/** @type {string} selector */ selector) =>
  // Array.from(document.querySelectorAll(selector));

  const $articles = $("div[class*=shadow]:has(img[src*=cover_image])")

  console.log("$articles count:", $articles.length)

  const articles = [...$articles].map((group) => {
    // console.log("group:", group)
    // 将 group 包装成 Cheerio 对象
    const $group = $(group)
    // console.log("group:", $group.text())
    const category = $group.find("span").first().text().trim()

    console.log("category:", category)

    const $subArticles = Array.from(
      $group.find("div[class*=mj-column-per]:has(img[src*=cover])"),
    )
    console.log("$subArticles count:", $subArticles.length, "\n")

    const subArticles = $subArticles.map((article) => {
      const $subArticle = $(article)
      const img = $subArticle.find("img[src*=cover]").first()
      const titleNode =
        $subArticle.find("a[class*=titleLink]").first() ??
        $subArticle
          .find("table > tbody > tr > td > table > tbody > tr:nth-child(2)")
          .first()

      const maybeAuthorNode = titleNode?.closest("tr")?.next()
      // 包含 docBody_ 的元素是摘要，不是作者信息
      const authorNode =
        maybeAuthorNode?.find("[class*=docBody]").length > 0
          ? null
          : maybeAuthorNode

      // console.log("maybeAuthorNode:", maybeAuthorNode)
      // console.log("authorNode:", authorNode)

      const title = titleNode?.text()
      const url = titleNode?.attr("href")

      // console.log("title:", title)
      // throw new Error("stop")

      if (!title) {
        console.error("titleNode:", titleNode)
        console.error("article:", article)
        throw new Error(`Missing title (${title}) for article`)
      }

      return {
        title,
        url,
        img: img?.attr("src"),
        summary: $subArticle.find("[class*=docBody]").first()?.text(),
        media: $subArticle.find("[class*=docSource] span").first()?.text(),
        author: authorNode?.text(),
      }
    })

    return {
      category,
      subArticles,
    }
  })

  return articles
}

export function articlesToMarkdown(articles: IArticle[]): string {
  // console.log("articles:", JSON.stringify(articles, null, 2))
  const md = articles
    .map((article, i) => {
      const { subArticles } = article
      // 如果只有一个子文章，则不需要显示标题
      const onlyOneArticle = subArticles.length === 1

      const articlesMd = subArticles
        .map((sub, j) => {
          const source = [sub.author, sub.media && `**${sub.media}**`]
            .filter(Boolean)
            .join(" | ")
          const title = sub.url ? `[${sub.title}](${sub.url})` : sub.title
          const indexPrefix = onlyOneArticle ? "" : `${i + 1}.${j + 1} `

          return `
### ${indexPrefix}${title}

![${sub.title}](${sub.img})

${sub.summary}

${source}`.trim()
        })
        .join("\n")

      return `
## ${indexToChinese(i + 1)}、${article.category}

${articlesMd}`
    })
    .join("\n")

  // console.log("markdown:", md)

  return md
}

// copy(`请通俗易懂翻译以下每周热门文章推荐：
// 1. 无需翻译作者名、书名或媒体平台，
// 2. 无需翻译 img 的 alt 比如 "![This is Water](https://readwise-assets.s3.amazonaws.com/media/wisereads/articles/this-is-water/cover_image.jpg)" 的 "This is Water"，
// 3. 中文和英文以及中文和数字之间必须有空格：

// ${md}
// `)

function indexToChinese(index: string | number): string {
  return (
    {
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
      6: "六",
      7: "七",
      8: "八",
      9: "九",
      10: "十",
    }[index] || String(index)
  )
}
