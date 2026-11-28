import type { ReactNode } from "react";
import type { AccentColor } from "@/components/fills";
import { SectionTitle } from "@/components/SectionHeader/SectionHeader";
import { Tag } from "@/components/Tag/Tag";
import styles from "./Chapter.module.css";

type ChapterProps = {
  id: string;
  number: number;
  title: string;
  era: string;
  eraColor: AccentColor;
  children: ReactNode;
};

export function Chapter({ id, number, title, era, eraColor, children }: ChapterProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={styles.chapter}>
      <p className={styles.number}>Capitolo {number}</p>
      <SectionTitle id={titleId}>{title}</SectionTitle>
      <Tag color={eraColor}>{era}</Tag>
      {children}
    </section>
  );
}

export function ChapterText({ muted = false, children }: { muted?: boolean; children: ReactNode }) {
  return <p className={`${styles.text} ${muted ? styles.muted : ""}`}>{children}</p>;
}
