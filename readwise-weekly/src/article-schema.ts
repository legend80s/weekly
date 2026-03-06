interface Article {
  category: string;
  subArticles: SubArticle[];
}

interface SubArticle {
  title: string;
  url: string;
  img: string;
  summary: string;
  media?: string;
  author?: string;
}
