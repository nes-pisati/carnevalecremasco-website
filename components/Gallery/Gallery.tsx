"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { MoreButton } from "@/components/MoreLink/MoreLink";
import { Photo, cyclePlaceholder } from "@/components/Photo/Photo";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { GalleryPhoto } from "@/lib/wp/types";
import { Lightbox } from "./Lightbox";
import styles from "./Gallery.module.css";

const TILE_PATTERN = ["big", "small", "tall", "small", "wide", "small", "small", "wide", "small", "small"] as const;

type TileLayout = (typeof TILE_PATTERN)[number];

const TILE_SIZES: Record<TileLayout, string> = {
  big: "(min-width: 901px) 50vw, 100vw",
  wide: "(min-width: 901px) 50vw, 100vw",
  tall: "(min-width: 901px) 25vw, 50vw",
  small: "(min-width: 901px) 25vw, 50vw",
};

type GalleryProps = {
  titleId: string;
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
  credit: string | null;
  pageSize: number;
};

export function Gallery({ titleId, title, subtitle, photos, credit, pageSize }: GalleryProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const pendingFocus = useRef<number | null>(null);

  const visible = photos.slice(0, visibleCount);
  const hasMore = photos.length > visible.length;

  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target !== null) zoomButton(target)?.focus();
  }, [visibleCount]);

  function zoomButton(index: number): HTMLButtonElement | null {
    return listRef.current?.querySelector<HTMLButtonElement>(`[data-photo-index="${index}"]`) ?? null;
  }

  function openAt(index: number) {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpenIndex(index);
  }

  function handleClose() {
    const lastIndex = openIndex;
    setOpenIndex(null);
    const target = (lastIndex === null ? null : zoomButton(lastIndex)) ?? openerRef.current;
    target?.focus();
  }

  function loadMore() {
    pendingFocus.current = visible.length;
    setVisibleCount((count) => count + pageSize);
  }

  return (
    <>
      <SectionHeader
        titleId={titleId}
        title={title}
        subtitle={subtitle}
        action={<MoreButton label="Apri la galleria" onClick={() => openAt(0)} />}
      />

      <ul ref={listRef} role="list" className={styles.grid}>
        {visible.map((photo, index) => {
          const layout = TILE_PATTERN[index % TILE_PATTERN.length];
          return (
            <li key={`${index}-${photo.title}`} className={`${styles.tile} ${styles[layout]}`}>
              <Photo
                className={styles.photo}
                photo={photo}
                placeholderColor={cyclePlaceholder(index)}
                sizes={TILE_SIZES[layout]}
                preload={index === 0}
              />
              <button
                type="button"
                className={styles.zoom}
                data-photo-index={index}
                aria-haspopup="dialog"
                aria-label={`Apri a tutto schermo: ${photo.title}`}
                onClick={() => openAt(index)}
              >
                <span className={styles.zoomDisc}>
                  <Icon name="expand" size={18} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <div className={styles.more}>
          <Button variant="secondary" onClick={loadMore}>
            Carica altre foto
          </Button>
        </div>
      )}

      <Lightbox
        photos={photos}
        credit={credit}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={handleClose}
      />
    </>
  );
}
