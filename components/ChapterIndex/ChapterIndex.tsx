"use client";

import { useEffect, useState } from "react";
import { cycleFill, fillClass } from "@/components/fills";
import styles from "./ChapterIndex.module.css";

export type ChapterIndexItem = {
  id: string;
  label: string;
};

type ChapterIndexProps = {
  items: ChapterIndexItem[];
  label: string;
};

const ACTIVATION_RATIO = 0.3;

function findActiveId(items: ChapterIndexItem[]): string | null {
  const activationLine = window.innerHeight * ACTIVATION_RATIO;
  let activeId: string | null = null;
  for (const item of items) {
    const target = document.getElementById(item.id);
    if (target && target.getBoundingClientRect().top <= activationLine) {
      activeId = item.id;
    }
  }
  return activeId;
}

export function ChapterIndex({ items, label }: ChapterIndexProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveId(findActiveId(items) ?? items[0]?.id ?? null);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label={label} className={styles.index}>
      <ol role="list" className={styles.list}>
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={`${styles.number} ${fillClass(cycleFill(index))}`} aria-hidden="true">
                  {index + 1}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
