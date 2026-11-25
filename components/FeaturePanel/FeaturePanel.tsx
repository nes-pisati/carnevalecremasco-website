import type { ReactNode } from "react";
import { MoreLink } from "@/components/MoreLink/MoreLink";
import { SectionTitle } from "@/components/SectionHeader/SectionHeader";
import styles from "./FeaturePanel.module.css";

type FeaturePanelProps = {
  title: ReactNode;
  titleId?: string;
  children: ReactNode;
  link?: { href: string; label: string };
  aside?: ReactNode;
};

export function FeaturePanel({ title, titleId, children, link, aside }: FeaturePanelProps) {
  return (
    <div className={styles.panel}>
      <span className={styles.disc} aria-hidden="true" />
      <div className={styles.text}>
        <SectionTitle id={titleId}>{title}</SectionTitle>
        <div className={styles.body}>{children}</div>
        {link && (
          <div>
            <MoreLink href={link.href} label={link.label} tone="dark" />
          </div>
        )}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className={styles.stats}>{children}</div>;
}
