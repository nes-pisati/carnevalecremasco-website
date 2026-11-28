import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody/ArticleBody";
import { ArticleHead } from "@/components/ArticleHead/ArticleHead";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { NewsGrid } from "@/components/NewsCard/NewsCard";
import { Section } from "@/components/Section/Section";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ShareBar } from "@/components/ShareBar/ShareBar";
import { routes } from "@/lib/routes";
import { newsArticleJsonLd } from "@/lib/structuredData";
import { getNewsArticle, getNewsSlugs, getOtherNews } from "@/lib/wp/news";
import { getSiteSettings } from "@/lib/wp/site";
import styles from "./page.module.css";

const OTHER_NEWS_COUNT = 3;
const ARTICLE_TITLE_ID = "articolo-titolo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return {};

  const cover = article.cover.file;
  return {
    title: `${article.title} · Carnevale Cremasco`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      ...(cover && {
        images: [{ url: cover.url, width: cover.width, height: cover.height, alt: article.cover.alt }],
      }),
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  const [otherNews, site] = await Promise.all([getOtherNews(slug, OTHER_NEWS_COUNT), getSiteSettings()]);

  return (
    <>
      <JsonLd data={newsArticleJsonLd(article, site)} />
      <article
        aria-labelledby={ARTICLE_TITLE_ID}
        className={otherNews.length === 0 ? styles.lastSection : undefined}
      >
        <ArticleHead article={article} titleId={ARTICLE_TITLE_ID} />
        <ArticleBody blocks={article.body} share={<ShareBar title={article.title} />} />
      </article>

      {otherNews.length > 0 && (
        <Section end aria-labelledby="altre-news-title">
          <SectionHeader
            titleId="altre-news-title"
            title="Altre news"
            link={{ href: routes.news, label: "Tutte le news" }}
          />
          <NewsGrid articles={otherNews} />
        </Section>
      )}
    </>
  );
}
