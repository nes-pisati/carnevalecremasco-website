import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import styles from "./Tag.module.css";

type TagProps = {
  color: AccentColor;
  children: ReactNode;
};

export function Tag({ color, children }: TagProps) {
  return <span className={`${styles.tag} ${fillClass(color)}`}>{children}</span>;
}
