// https://wx.mail.qq.com/home/index?sid=...#/search?searchKey=...
// @ts-check

/** @type {HTMLDivElement[]} */
// @ts-expect-error
const $articles = tampermonkeyUtils.$$(
	"div[class*=shadow_]:has(img[src*=cover_image])",
);

const articles = $articles.map((group) => {
	// @ts-expect-error
	const category = group.querySelector("span").textContent;

	const $subArticles = Array.from(
		group.querySelectorAll("div[class*=mj-column-per]:has(img[src*=cover])"),
	);

	const subArticles = $subArticles.map((article) => {
		const img = article.querySelector("img[src*=cover]");
		const titleNode =
			article.querySelector("a[class*=titleLink_]") ??
			article.querySelector(
				"table > tbody > tr > td > table > tbody > tr:nth-child(2)",
			);

		const maybeAuthorNode = titleNode?.closest("tr")?.nextElementSibling;
		// 包含 docBody_ 的元素是摘要，不是作者信息
		const authorNode = maybeAuthorNode?.querySelector("[class*=docBody_]")
			? null
			: maybeAuthorNode;

		const title = titleNode?.textContent;
		const url = titleNode?.getAttribute("href");

		if (!title) {
			console.error("titleNode:", titleNode);
			console.error("article:", article);
			throw new Error(`Missing title (${title}) for article`);
		}

		return {
			title,
			url,
			img: img?.getAttribute("src"),
			// @ts-expect-error innerText
			summary: article.querySelector("[class*=docBody_]")?.innerText,
			media: article.querySelector("[class*=docSource_] span")?.textContent,
			author: authorNode?.textContent,
		};
	});

	return {
		category,
		subArticles,
	};
});

console.log("articles:", articles);

// to markdown

const md = articles
	.map((article, i) => {
		const articlesMd = article.subArticles
			.map((sub, j) => {
				const source = [sub.author, sub.media && `**${sub.media}**`]
					.filter(Boolean)
					.join(" | ");
				const title = sub.url ? `[${sub.title}](${sub.url})` : sub.title;

				return `
### ${i + 1}.${j + 1} ${title}

![${sub.title}](${sub.img})

${sub.summary}

${source}`.trim();
			})
			.join("\n");

		return `
## ${i + 1}. ${article.category}

${articlesMd}`;
	})
	.join("\n");

console.log("markdown:", md);

// @ts-expect-error
copy(md);
