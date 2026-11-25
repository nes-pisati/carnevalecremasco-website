import type { ReactNode } from "react";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import styles from "./SectionHeader.module.css";

type Tone = "light" | "dark";

type SectionTitleProps = {
  id?: string;
  children: ReactNode;
};

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className={styles.title}>
      {children}
    </h2>
  );
}

type SectionHeaderProps = {
  title: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  link?: { href: string; label: string };
  tone?: Tone;
};

export function SectionHeader({ title, titleId, subtitle, link, tone = "light" }: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[tone]}`}>
      <div>
        <SectionTitle id={titleId}>{title}</SectionTitle>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {link && <MoreLink href={link.href} label={link.label} tone={tone} />}
    </div>
  );
}
