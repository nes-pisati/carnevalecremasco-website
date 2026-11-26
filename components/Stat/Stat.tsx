import type { ReactNode } from "react";
import styles from "./Stat.module.css";

type StatTone = "light" | "blue" | "cream";

type StatProps = {
  value: string;
  label: string;
  tone?: "light" | "blue";
  valueColor?: "ink" | "red";
  layout?: "stacked" | "inline";
};

export function Stat({ value, label, tone = "light", valueColor = "ink", layout = "stacked" }: StatProps) {
  const classes = [styles.stat, styles[tone], layout === "inline" && styles.inline].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <p className={`${styles.value} ${valueColor === "red" ? styles.redValue : ""}`}>{value}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

type StatBoxProps = {
  title: string;
  tone?: StatTone;
  children: ReactNode;
};

export function StatBox({ title, tone = "light", children }: StatBoxProps) {
  return (
    <div className={`${styles.stat} ${styles[tone]}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
