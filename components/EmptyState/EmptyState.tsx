import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  text: string;
  action?: ReactNode;
};

export function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.art} aria-hidden="true">
        <span className={styles.disc} />
        <span className={styles.half} />
        <span className={styles.tile} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
      {action}
    </div>
  );
}
