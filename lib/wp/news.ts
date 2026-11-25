import { newsMock } from "./mock/news";
import type { NewsArticle, NewsTag, PartialDate } from "./types";

export const newsTagLabels: Record<NewsTag, string> = {
  news: "News",
  eventi: "Eventi",
  progetti: "Progetti",
};

function dateSortKey(date: PartialDate | null): number {
  if (!date) return Number.NEGATIVE_INFINITY;
  return date.year * 10000 + date.month * 100 + (date.day ?? 0);
}

export async function getNews(): Promise<NewsArticle[]> {
  return [...newsMock].sort((a, b) => dateSortKey(b.date) - dateSortKey(a.date));
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
