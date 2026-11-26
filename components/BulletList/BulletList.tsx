import { Label } from "@/components/Label/Label";
import { Stack } from "@/components/Stack/Stack";
import styles from "./BulletList.module.css";

type BulletListProps = {
  title: string;
  items: string[];
  color?: "red" | "blue";
  columns?: 1 | 2;
};

export function BulletList({ title, items, color = "red", columns = 2 }: BulletListProps) {
  const classes = [styles.list, styles[color], columns === 2 && styles.twoColumns].filter(Boolean).join(" ");
  return (
    <Stack gap={12}>
      <Label>{title}</Label>
      <ul role="list" className={classes}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </Stack>
  );
}
