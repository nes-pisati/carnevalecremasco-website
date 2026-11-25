import type { ReactNode } from "react";
import styles from "./Pill.module.css";

type PillProps = {
  tone?: "light" | "red";
  children: ReactNode;
};

export function Pill({ tone = "light", children }: PillProps) {
  return <span className={`${styles.pill} ${styles[tone]}`}>{children}</span>;
}
