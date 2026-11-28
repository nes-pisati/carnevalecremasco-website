"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/Icon/Icon";
import styles from "./SponsorSlider.module.css";

const AUTOPLAY_INTERVAL_MS = 5000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

type SponsorSliderProps = {
  label: string;
  items: { key: string; content: ReactNode }[];
};

export function SponsorSlider({ label, items }: SponsorSliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pausedByUser, setPausedByUser] = useState<boolean | null>(null);
  const [interacting, setInteracting] = useState(false);

  const paused = pausedByUser ?? reducedMotion;
  const scrollable = pageCount > 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      setPageCount(Math.max(1, Math.ceil((track.scrollWidth - 1) / track.clientWidth)));
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = (target + pageCount) % pageCount;
      track.scrollTo({ left: next * track.clientWidth, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [pageCount, reducedMotion],
  );

  useEffect(() => {
    if (paused || interacting || !scrollable) return;
    const timer = window.setInterval(() => goTo(page + 1), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, interacting, scrollable, page, goTo]);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    setPage(atEnd ? pageCount - 1 : Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div
      className={styles.panel}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div className={styles.head}>
        <p className={styles.label}>{label}</p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Loghi precedenti"
            disabled={!scrollable}
            onClick={() => goTo(page - 1)}
          >
            <Icon name="left" size={20} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Loghi successivi"
            disabled={!scrollable}
            onClick={() => goTo(page + 1)}
          >
            <Icon name="right" size={20} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label={paused ? "Riprendi lo scorrimento" : "Metti in pausa lo scorrimento"}
            disabled={!scrollable}
            onClick={() => setPausedByUser(!paused)}
          >
            <Icon name={paused ? "play" : "pause"} size={18} />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        role="list"
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
        className={styles.track}
        onScroll={handleScroll}
      >
        {items.map((item) => (
          <li key={item.key} className={styles.slide}>
            {item.content}
          </li>
        ))}
      </ul>
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: pageCount }, (_, index) => (
          <span key={index} className={index === page ? `${styles.dot} ${styles.current}` : styles.dot} />
        ))}
      </div>
    </div>
  );
}
