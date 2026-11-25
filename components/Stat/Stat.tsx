import styles from "./Stat.module.css";

type StatProps = {
  value: string;
  label: string;
  tone?: "light" | "blue";
};

export function Stat({ value, label, tone = "light" }: StatProps) {
  return (
    <div className={`${styles.stat} ${styles[tone]}`}>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
