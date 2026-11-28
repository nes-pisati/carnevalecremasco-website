import { Container } from "@/components/Container/Container";
import { newsTagColors } from "@/components/NewsCard/NewsCard";
import { Breadcrumb } from "@/components/PageHead/PageHead";
import { Photo } from "@/components/Photo/Photo";
import { Tag } from "@/components/Tag/Tag";
import { formatPartialDate, partialDateToIso } from "@/lib/format";
import { routes } from "@/lib/routes";
import { newsTagLabels } from "@/lib/wp/newsTags";
import type { NewsArticle } from "@/lib/wp/types";
import styles from "./ArticleHead.module.css";

type ArticleHeadProps = {
  article: NewsArticle;
  titleId: string;
};

export function ArticleHead({ article, titleId }: ArticleHeadProps) {
  const tagLabel = newsTagLabels[article.tag];

  return (
    <Container>
      <header className={styles.head}>
        <Breadcrumb
          items={[
            { label: "Home", href: routes.home },
            { label: "News", href: routes.news },
            { label: tagLabel, current: true },
          ]}
        />
        <p className={styles.meta}>
          <Tag color={newsTagColors[article.tag]}>{tagLabel}</Tag>
          {article.date ? (
            <time dateTime={partialDateToIso(article.date)}>{formatPartialDate(article.date)}</time>
          ) : (
            <span>{formatPartialDate(null)}</span>
          )}
        </p>
        <h1 id={titleId} className={styles.title}>
          {article.title}
        </h1>
        <p className={styles.lead}>{article.excerpt}</p>
      </header>
      <Photo
        className={styles.hero}
        photo={article.cover}
        placeholderColor={newsTagColors[article.tag]}
        sizes="(min-width: 1377px) 1312px, 100vw"
        preload
      />
    </Container>
  );
}
