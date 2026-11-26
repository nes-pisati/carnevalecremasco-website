import type { ReactNode } from "react";
import { Icon } from "@/components/Icon/Icon";
import styles from "./Notice.module.css";

type NoticeProps = {
  children: ReactNode;
};

export function Notice({ children }: NoticeProps) {
  return (
    <p className={styles.notice}>
      <span className={styles.disc}>
        <Icon name="info" size={20} />
      </span>
      <span>{children}</span>
    </p>
  );
}
