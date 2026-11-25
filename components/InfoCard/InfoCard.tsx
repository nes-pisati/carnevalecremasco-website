import Link from "next/link";
import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./InfoCard.module.css";

export type InfoCardItem = {
  href: string;
  title: string;
  text: string;
  icon: IconName;
  color: AccentColor;
};

export function InfoCard({ href, title, text, icon, color }: InfoCardItem) {
  return (
    <Link href={href} className={`${styles.card} ${fillClass(color)}`}>
      <span className={styles.icon}>
        <Icon name={icon} />
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </span>
    </Link>
  );
}

export function InfoCardGrid({ items }: { items: InfoCardItem[] }) {
  return (
    <ul role="list" className={styles.grid}>
      {items.map((item) => (
        <li key={item.href} className={styles.cell}>
          <InfoCard {...item} />
        </li>
      ))}
    </ul>
  );
}
