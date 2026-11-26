import type { ReactNode } from "react";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./HowTo.module.css";

type HowToProps = {
  icon: IconName;
  color: AccentColor;
  title: string;
  children: ReactNode;
};

export function HowTo({ icon, color, title, children }: HowToProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.head}>
        <span className={`${styles.disc} ${fillClass(color)}`}>
          <Icon name={icon} />
        </span>
        {title}
      </h3>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
