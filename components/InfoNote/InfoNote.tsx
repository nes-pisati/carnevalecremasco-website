import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./InfoNote.module.css";

type InfoNoteProps = {
  icon: IconName;
  color: AccentColor;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function InfoNote({ icon, color, eyebrow, title, children }: InfoNoteProps) {
  return (
    <div className={`${styles.note} ${fillClass(color)}`}>
      <span className={styles.icon} aria-hidden="true">
        <Icon name={icon} />
      </span>
      <div className={styles.body}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
}
