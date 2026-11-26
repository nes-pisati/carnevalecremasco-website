import Link from "next/link";
import { cycleFill, fillClass } from "@/components/fills";
import styles from "./SectionIndex.module.css";

export type SectionIndexItem = {
  href: string;
  label: string;
};

type SectionIndexProps = {
  items: SectionIndexItem[];
  label: string;
};

export function SectionIndex({ items, label }: SectionIndexProps) {
  return (
    <nav aria-label={label} className={styles.index}>
      <ol role="list" className={styles.list}>
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              <span className={`${styles.number} ${fillClass(cycleFill(index))}`} aria-hidden="true">
                {index + 1}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
