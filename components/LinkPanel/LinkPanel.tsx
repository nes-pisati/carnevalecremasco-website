import type { ReactNode } from "react";
import styles from "./LinkPanel.module.css";

type LinkPanelProps = {
  title: string;
  titleId: string;
  children: ReactNode;
};

export function LinkPanel({ title, titleId, children }: LinkPanelProps) {
  return (
    <div className={styles.panel}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.actions}>{children}</div>
    </div>
  );
}
