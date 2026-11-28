import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import styles from "./InviteBox.module.css";

type InviteBoxProps = {
  color: AccentColor | "raised";
  discColor: AccentColor;
  title: string;
  titleAs?: "h2" | "h3";
  children: ReactNode;
  actions: ReactNode;
};

export function InviteBox({ color, discColor, title, titleAs: Title = "h3", children, actions }: InviteBoxProps) {
  return (
    <div className={`${styles.invite} ${color === "raised" ? styles.raised : fillClass(color)}`}>
      <span className={`${styles.disc} ${fillClass(discColor)}`} aria-hidden="true" />
      <div className={styles.text}>
        <Title className={styles.title}>{title}</Title>
        <div className={styles.body}>{children}</div>
      </div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
