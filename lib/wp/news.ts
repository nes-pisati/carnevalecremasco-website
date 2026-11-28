import { newsMock } from "./mock/news";
import type { NewsArticle, NewsSummary, PartialDate } from "./types";

export { newsTagLabels, newsTags } from "./newsTags";

function dateSortKey(date: PartialDate | null): number {
  if (!date) return Number.NEGATIVE_INFINITY;
  return date.year * 10000 + date.month * 100 + (date.day ?? 0);
}

export async function getNews(): Promise<NewsArticle[]> {
  return [...newsMock].sort((a, b) => dateSortKey(b.date) - dateSortKey(a.date));
}

function toSummary(article: NewsArticle): NewsSummary {
  const summary: Partial<NewsArticle> = { ...article };
  delete summary.body;
  return summary as NewsSummary;
}

export async function getNewsSummaries(): Promise<NewsSummary[]> {
  const news = await getNews();
  return news.map(toSummary);
}

export async function getLatestNews(count: number): Promise<NewsArticle[]> {
  const news = await getNews();
  return news.slice(0, count);
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return newsMock.find((article) => article.slug === slug) ?? null;
}

export async function getNewsSlugs(): Promise<string[]> {
  return newsMock.map((article) => article.slug);
}

export async function getOtherNews(slug: string, count: number): Promise<NewsArticle[]> {
  const news = await getNews();
  return news.filter((article) => article.slug !== slug).slice(0, count);
}
