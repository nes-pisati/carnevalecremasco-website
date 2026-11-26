import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./ParkCard.module.css";

type ParkCardMark = { icon: IconName; letter?: never } | { letter: string; icon?: never };

type ParkCardProps = ParkCardMark & {
  color: AccentColor | "raised";
  eyebrow: string;
  name: string;
  children: ReactNode;
};

function discClassName(color: ParkCardProps["color"]): string {
  if (color === "cream") return `${styles.disc} ${styles.solidDisc}`;
  if (color === "raised") return `${styles.disc} ${styles.creamDisc}`;
  return styles.disc;
}

export function ParkCard({ color, icon, letter, eyebrow, name, children }: ParkCardProps) {
  const cardClass = color === "raised" ? styles.raised : fillClass(color);
  return (
    <div className={`${styles.card} ${cardClass}`}>
      <span className={discClassName(color)} aria-hidden={letter ? "true" : undefined}>
        {icon ? <Icon name={icon} /> : <span className={styles.letter}>{letter}</span>}
      </span>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
}
