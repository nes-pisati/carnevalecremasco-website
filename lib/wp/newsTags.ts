import type { NewsTag } from "./types";

export const newsTags: readonly NewsTag[] = ["news", "eventi", "progetti"];

export const newsTagLabels: Record<NewsTag, string> = {
  news: "News",
  eventi: "Eventi",
  progetti: "Progetti",
};
