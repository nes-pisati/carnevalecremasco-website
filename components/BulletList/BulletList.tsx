import { Label } from "@/components/Label/Label";
import { Stack } from "@/components/Stack/Stack";
import styles from "./BulletList.module.css";

type BulletListProps = {
  title: string;
  items: string[];
  color?: "red" | "blue";
};

export function BulletList({ title, items, color = "red" }: BulletListProps) {
  return (
    <Stack gap={12}>
      <Label>{title}</Label>
      <ul role="list" className={`${styles.list} ${styles[color]}`}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </Stack>
  );
}
