import Link from "next/link";
import type { AccentColor } from "@/components/fills";
import { Photo } from "@/components/Photo/Photo";
import { Tag } from "@/components/Tag/Tag";
import { formatPartialDate } from "@/lib/format";
import { newsArticleRoute } from "@/lib/routes";
import { newsTagLabels } from "@/lib/wp/newsTags";
import type { NewsSummary, NewsTag } from "@/lib/wp/types";
import styles from "./NewsCard.module.css";

export const newsTagColors: Record<NewsTag, AccentColor> = {
  news: "red",
  eventi: "blue",
  progetti: "pink",
};

export type NewsHeadingLevel = "h2" | "h3";

type NewsCardProps = {
  article: NewsSummary;
  headingLevel?: NewsHeadingLevel;
};

function NewsTagLabel({ article }: { article: NewsSummary }) {
  return (
    <Tag color={newsTagColors[article.tag]}>
      {newsTagLabels[article.tag]} · {formatPartialDate(article.date)}
    </Tag>
  );
}

export function NewsCard({ article, headingLevel: Heading = "h3" }: NewsCardProps) {
  return (
    <Link href={newsArticleRoute(article.slug)} className={styles.card}>
      <Photo
        className={styles.photo}
        photo={article.cover}
        placeholderColor={newsTagColors[article.tag]}
        sizes="(min-width: 901px) 33vw, 100vw"
      />
      <span className={styles.body}>
        <NewsTagLabel article={article} />
        <Heading className={styles.title}>{article.title}</Heading>
        <span className={styles.text}>{article.excerpt}</span>
      </span>
    </Link>
  );
}

export function NewsFeature({ article, headingLevel: Heading = "h2" }: NewsCardProps) {
  return (
    <Link href={newsArticleRoute(article.slug)} className={styles.feature}>
      <Photo
        className={styles.featurePhoto}
        photo={article.cover}
        placeholderColor={newsTagColors[article.tag]}
        sizes="(min-width: 901px) 55vw, 100vw"
      />
      <span className={styles.featureBody}>
        <NewsTagLabel article={article} />
        <Heading className={styles.featureTitle}>{article.title}</Heading>
        <span className={styles.text}>{article.excerpt}</span>
        <span className={styles.more}>
          Leggi la notizia<span aria-hidden="true">{" →"}</span>
        </span>
      </span>
    </Link>
  );
}

type NewsGridProps = {
  articles: NewsSummary[];
  headingLevel?: NewsHeadingLevel;
};

export function NewsGrid({ articles, headingLevel }: NewsGridProps) {
  return (
    <ul role="list" className={styles.grid}>
      {articles.map((article) => (
        <li key={article.slug} className={styles.cell}>
          <NewsCard article={article} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
