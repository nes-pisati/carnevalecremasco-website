"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { FilterGroup, type FilterOption } from "@/components/FilterGroup/FilterGroup";
import { NewsFeature, NewsGrid } from "@/components/NewsCard/NewsCard";
import { withFeaturedFirst } from "@/lib/featuredNews";
import { newsTagLabels, newsTags } from "@/lib/wp/newsTags";
import type { NewsSummary, NewsTag } from "@/lib/wp/types";
import styles from "./NewsList.module.css";

type NewsFilter = NewsTag | "tutte";

const ALL_NEWS: NewsFilter = "tutte";

const filterOptions: readonly FilterOption<NewsFilter>[] = [
  { value: ALL_NEWS, label: "Tutte" },
  ...newsTags.map((tag) => ({ value: tag, label: newsTagLabels[tag] })),
];

type NewsListProps = {
  articles: NewsSummary[];
  pageSize: number;
};

function resultsAnnouncement(count: number): string {
  if (count === 0) return "Nessun contenuto per questo tag";
  return count === 1 ? "1 news" : `${count} news`;
}

export function NewsList({ articles, pageSize }: NewsListProps) {
  const [filter, setFilter] = useState<NewsFilter>(ALL_NEWS);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [announcement, setAnnouncement] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const selectedFilterRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"filter" | number | null>(null);

  const filtered =
    filter === ALL_NEWS ? withFeaturedFirst(articles) : articles.filter((article) => article.tag === filter);
  const visible = filtered.slice(0, visibleCount);
  const [featured, ...rest] = visible;
  const hasMore = filtered.length > visible.length;

  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "filter") {
      selectedFilterRef.current?.focus();
    } else if (typeof target === "number") {
      listRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]")[target]?.focus();
    }
  }, [filter, visibleCount]);

  function selectFilter(next: NewsFilter, focusFilter = false) {
    const nextCount =
      next === ALL_NEWS ? articles.length : articles.filter((article) => article.tag === next).length;
    if (focusFilter) pendingFocus.current = "filter";
    setFilter(next);
    setVisibleCount(pageSize);
    setAnnouncement(resultsAnnouncement(nextCount));
  }

  function loadMore() {
    pendingFocus.current = visible.length;
    setVisibleCount((count) => count + pageSize);
  }

  return (
    <>
      <FilterGroup
        label="Filtra per tag"
        options={filterOptions}
        selected={filter}
        onSelect={(next) => selectFilter(next)}
        selectedRef={selectedFilterRef}
        className={styles.filters}
      />
      <p role="status" className="visually-hidden">
        {announcement}
      </p>

      {featured ? (
        <div ref={listRef} className={styles.list}>
          <NewsFeature article={featured} />
          {rest.length > 0 && <NewsGrid articles={rest} headingLevel="h2" />}
        </div>
      ) : (
        <EmptyState
          title="Nessun contenuto per questo tag"
          text="Prova con un altro filtro o guarda tutte le news."
          action={<Button onClick={() => selectFilter(ALL_NEWS, true)}>Mostra tutte le news</Button>}
        />
      )}

      {hasMore && (
        <div className={styles.more}>
          <Button variant="secondary" onClick={loadMore}>
            Carica altre news
          </Button>
          <p className={styles.meta}>Stai vedendo le news più recenti</p>
        </div>
      )}
    </>
  );
}
