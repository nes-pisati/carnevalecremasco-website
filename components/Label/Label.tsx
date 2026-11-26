import type { ReactNode } from "react";
import styles from "./Label.module.css";

type LabelProps = {
  as?: "h3" | "h4" | "p";
  children: ReactNode;
};

export function Label({ as: Element = "h3", children }: LabelProps) {
  return <Element className={styles.label}>{children}</Element>;
}
