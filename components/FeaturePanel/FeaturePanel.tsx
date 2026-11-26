import type { ReactNode } from "react";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { SectionTitle } from "@/components/SectionHeader/SectionHeader";
import styles from "./FeaturePanel.module.css";

type FeaturePanelProps = {
  title: ReactNode;
  titleId?: string;
  eyebrow?: string;
  children: ReactNode;
  link?: { href: string; label: string };
  actions?: ReactNode;
  aside?: ReactNode;
  discColor?: "red" | "blue";
  align?: "center" | "start";
};

export function FeaturePanel({
  title,
  titleId,
  eyebrow,
  children,
  link,
  actions,
  aside,
  discColor = "red",
  align = "center",
}: FeaturePanelProps) {
  const classes = [styles.panel, align === "start" && styles.alignStart].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <span className={`${styles.disc} ${styles[discColor]}`} aria-hidden="true" />
      <div className={styles.text}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <SectionTitle id={titleId}>{title}</SectionTitle>
        <div className={styles.body}>{children}</div>
        {link && (
          <div>
            <MoreLink href={link.href} label={link.label} tone="dark" />
          </div>
        )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}

export function StatGrid({ children, columns = 2 }: { children: ReactNode; columns?: 1 | 2 }) {
  return <div className={`${styles.stats} ${columns === 1 ? styles.single : ""}`}>{children}</div>;
}
