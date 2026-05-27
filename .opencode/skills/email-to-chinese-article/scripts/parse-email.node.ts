import * as cheerio from "cheerio"
import Imap from "imap"
import { simpleParser } from "mailparser"

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

type IHTML = string

// let imapSingleton: Imap | null = null

function getImapInstance(): Imap {
  // if (imapSingleton) {
  //   return imapSingleton
  // }

  const { IMAP_USER, IMAP_PASS } = process.env

  if (!IMAP_USER || !IMAP_PASS) {
    throw new Error(
      `EnvError: empty IMAP_USER (${IMAP_USER}) or IMAP_PASS (${IMAP_PASS}. Maybe your forget to fill the .env file`,
    )
  }

  const imapConfig = {
    user: IMAP_USER!,
    password: IMAP_PASS!,
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT),
    tls: process.env.IMAP_TLS === "true",
    tlsOptions: {
      rejectUnauthorized: process.env.IMAP_REJECT_UNAUTHORIZED !== "false",
    },
  }

  // console.log("imapConfig:", imapConfig)

  // throw new Error("Not implemented")

  // imapSingleton = new Imap(imapConfig)

  // return imapSingleton

  return new Imap(imapConfig)
}

async function searchEmail(emailSubject: string): Promise<IHTML> {
  const label = `searchEmail for subject: "${emailSubject}"` // 1.222s
  console.time(label)
  try {
    return await searchEmailCore(emailSubject)
  } finally {
    console.timeEnd(label)
  }
}

async function searchEmailCore(emailSubject: string): Promise<IHTML> {
  if (!emailSubject) {
    throw new RangeError(
      `emailSubject should not be empty but got (${emailSubject})`,
    )
  }

  const imap = getImapInstance()

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

                const html = parsed.html || ""
                console.log("html email length:", html.length)

                // 如果 html 为空，则报错提醒
                if (!html) {
                  reject(
                    new Error(
                      `Email with subject "${emailSubject}" has no HTML content.`,
                    ),
                  )
                  return
                }

                imap.end()
                resolve(html)
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

export async function searchTenTabsEmail(subject: string): Promise<IHTML> {
  if (!subject) {
    throw new RangeError(`subject should not be empty but got (${subject})`)
  }

  return await searchEmail(subject.trim())
}

export async function searchWisereadsEmail(volNum: number): Promise<IHTML> {
  if (!volNum) {
    throw new RangeError(
      `volNum should be a positive integer but got (${volNum})`,
    )
  }

  const emailSubject = `Wisereads Vol. ${volNum}`

  return await searchEmail(emailSubject)
}

export function extractTenTabsArticles(html: string): IArticle[] {
  const $ = cheerio.load(html)

  const $articles = $("img[src^='https://pocket-image-cache.com/']").map(
    (_index, img) => $(img).closest("tr"),
  )

  console.log("Ten Tabs $articles count:", $articles.length)

  const subs = $articles.map((_index, $sub) => {
    const $titleLink = $sub
      .find("a")
      .filter((i, el) => {
        return $(el).text().trim() !== ""
      })
      .first()

    if (!$titleLink) {
      throw new Error(`Missing title node for article #${_index}`)
    }

    const title = $titleLink.text()
    // console.log("title:", title)

    if (!title) {
      throw new Error(`Empty title text for article #${_index}`)
    }

    const $summaryTr = $titleLink.closest(`tr`).next()
    // console.log("$summaryTr.text():", $summaryTr.find("a").first().text())
    const $mediaAndAuthor = $summaryTr
      .next()
      .find("td")
      .first()
      .text()
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean)

    // console.log("$mediaAndAuthor:", $mediaAndAuthor)
    return {
      title,
      url: $titleLink.attr("href"),
      img: $sub
        .find("img")
        .first()
        .attr("src")
        ?.replace(/\/\d+x\d+\//, "/600x600/"),
      summary: $summaryTr.find("a").first().text().trim(),
      media: $mediaAndAuthor[0],
      author: $mediaAndAuthor[1],
    }
  })

  return [
    {
      category: "还有哪些值得看的国际新闻",
      subArticles: subs.get(),
    },
  ]
}

export function extractWiseReadArticles(html: string): IArticle[] {
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

    // console.log("category:", category)

    const $subArticles = Array.from(
      $group.find("div[class*=mj-column-per]:has(img[src*=cover])"),
    )
    // console.log("$subArticles count:", $subArticles.length, "\n")

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

export function extractLinksToMarkdown(articles: IArticle[]): string {
  const linksMd: string = articles
    .flatMap((item) =>
      item.subArticles.map((sub) => sub.url && `- [${sub.title}](${sub.url})`),
    )
    .filter(Boolean)
    .join("\n")

  return linksMd
}

export function articlesToMarkdown(
  articles: IArticle[],
  {
    titleWithUrl,
    startIndex,
  }: {
    titleWithUrl: boolean
    startIndex?: number
  },
): string {
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
          const title =
            titleWithUrl && sub.url ? `[${sub.title}](${sub.url})` : sub.title

          const indexPrefix = onlyOneArticle
            ? ""
            : `${startIndex ? startIndex + i : i + 1}.${j + 1} `

          return `
### ${indexPrefix}${title}

![${sub.title}](${sub.img})

${sub.summary}

${source}
`.trimStart()
        })
        .join("\n")

      return `
## ${indexToChinese(startIndex ? startIndex + i : i + 1)}、${article.category}

${articlesMd}`
    })
    .join("\n")
    .trim()

  // console.log("markdown:", md)

  return md
}

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
