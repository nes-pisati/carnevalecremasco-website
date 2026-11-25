import type { ComponentProps } from "react";
import styles from "./Container.module.css";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={[styles.container, className].filter(Boolean).join(" ")} {...props} />;
}
