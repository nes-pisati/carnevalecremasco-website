import type { ReactNode } from "react";
import styles from "./SplitPanel.module.css";

type SplitPanelProps = {
  main: ReactNode;
  aside: ReactNode;
  tone?: "raised" | "cream";
  asideAlign?: "stretch" | "center";
  mainWidth?: "default" | "wide";
};

export function SplitPanel({ main, aside, tone = "raised", asideAlign = "stretch", mainWidth = "default" }: SplitPanelProps) {
  const classes = [styles.split, styles[tone], mainWidth === "wide" && styles.wide].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <div>{main}</div>
      <div className={asideAlign === "center" ? styles.center : undefined}>{aside}</div>
    </div>
  );
}
