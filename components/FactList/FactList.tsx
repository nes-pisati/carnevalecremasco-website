import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon/Icon";
import styles from "./FactList.module.css";

export function FactList({ children }: { children: ReactNode }) {
  return <dl className={styles.facts}>{children}</dl>;
}

type FactProps = {
  icon: IconName;
  label: string;
  children: ReactNode;
};

export function Fact({ icon, label, children }: FactProps) {
  return (
    <div className={styles.fact}>
      <dt className={styles.label}>
        <span className={styles.disc}>
          <Icon name={icon} size={20} />
        </span>
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
