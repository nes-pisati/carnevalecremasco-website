import Link from "next/link";
import type { AccentColor } from "@/components/fills";
import { Photo } from "@/components/Photo/Photo";
import { Tag } from "@/components/Tag/Tag";
import { formatPartialDate } from "@/lib/format";
import { newsArticleRoute } from "@/lib/routes";
import { newsTagLabels } from "@/lib/wp/news";
import type { NewsArticle, NewsTag } from "@/lib/wp/types";
import styles from "./NewsCard.module.css";

export const newsTagColors: Record<NewsTag, AccentColor> = {
  news: "red",
  eventi: "blue",
  progetti: "pink",
};

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={newsArticleRoute(article.slug)} className={styles.card}>
      <Photo
        className={styles.photo}
        photo={article.cover}
        placeholderColor={newsTagColors[article.tag]}
        sizes="(min-width: 901px) 33vw, 100vw"
      />
      <span className={styles.body}>
        <Tag color={newsTagColors[article.tag]}>
          {newsTagLabels[article.tag]} · {formatPartialDate(article.date)}
        </Tag>
        <h3 className={styles.title}>{article.title}</h3>
        <span className={styles.text}>{article.excerpt}</span>
      </span>
    </Link>
  );
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <ul role="list" className={styles.grid}>
      {articles.map((article) => (
        <li key={article.slug} className={styles.cell}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  );
}
