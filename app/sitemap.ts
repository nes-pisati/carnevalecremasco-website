import type { MetadataRoute } from "next";
import { partialDateToIso } from "@/lib/format";
import { newsArticleRoute, routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";
import { getNewsSummaries } from "@/lib/wp/news";

const pagePaths = [
  routes.home,
  routes.programma,
  routes.informazioni,
  routes.convenzioni,
  routes.storia,
  routes.foto,
  routes.news,
  routes.contatti,
];

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsSummaries();

  return [
    ...pagePaths.map((path) => ({ url: absoluteUrl(path) })),
    ...news.map((article) => ({
      url: absoluteUrl(newsArticleRoute(article.slug)),
      ...(article.date && { lastModified: partialDateToIso(article.date) }),
    })),
  ];
}
