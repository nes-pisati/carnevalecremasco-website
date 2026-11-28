import type { NewsSummary } from "@/lib/wp/types";

export function withFeaturedFirst<Article extends NewsSummary>(articles: Article[]): Article[] {
  const featuredIndex = articles.findIndex((article) => article.isFeatured);
  if (featuredIndex <= 0) return articles;
  const featured = articles[featuredIndex];
  return [featured, ...articles.slice(0, featuredIndex), ...articles.slice(featuredIndex + 1)];
}
