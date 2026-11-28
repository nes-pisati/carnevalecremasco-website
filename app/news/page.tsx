import type { Metadata } from "next";
import { Container } from "@/components/Container/Container";
import { NewsList } from "@/components/NewsList/NewsList";
import { PageHead } from "@/components/PageHead/PageHead";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { getNewsSummaries } from "@/lib/wp/news";
import styles from "./page.module.css";

const NEWS_PAGE_SIZE = 10;

export const metadata: Metadata = pageMetadata({
  title: "News",
  description:
    "Notizie, eventi e progetti del Carnevale Cremasco durante tutto l’anno.",
  path: routes.news,
});

export default async function NewsPage() {
  const articles = await getNewsSummaries();

  return (
    <>
      <PageHead
        title="News"
        lead="Notizie, eventi e progetti del Carnevale Cremasco durante tutto l’anno."
      />
      <Container>
        <section aria-label="Elenco delle news" className={styles.list}>
          <NewsList articles={articles} pageSize={NEWS_PAGE_SIZE} />
        </section>
      </Container>
    </>
  );
}
