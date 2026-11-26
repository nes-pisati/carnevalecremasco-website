import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./ParkCard.module.css";

type ParkCardProps = {
  color: AccentColor;
  icon: IconName;
  eyebrow: string;
  name: string;
  children: ReactNode;
};

export function ParkCard({ color, icon, eyebrow, name, children }: ParkCardProps) {
  const discClass = color === "cream" ? `${styles.disc} ${styles.solidDisc}` : styles.disc;
  return (
    <div className={`${styles.card} ${fillClass(color)}`}>
      <span className={discClass}>
        <Icon name={icon} />
      </span>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
}
