import { fillClass, type AccentColor } from "@/components/fills";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./StepCard.module.css";

export type StepCardItem = {
  title: string;
  text: string;
  color: AccentColor;
  icon?: IconName;
};

function StepCard({ title, text, color, icon, number }: StepCardItem & { number: number }) {
  return (
    <div className={`${styles.card} ${fillClass(color)}`}>
      <span className={styles.marker} aria-hidden="true">
        {icon ? <Icon name={icon} size={36} /> : number}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export function StepCardGrid({ items }: { items: StepCardItem[] }) {
  return (
    <ol role="list" className={styles.grid}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.cell}>
          <StepCard {...item} number={index + 1} />
        </li>
      ))}
    </ol>
  );
}
