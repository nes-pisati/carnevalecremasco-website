import type { ComponentProps } from "react";
import styles from "./Section.module.css";

type SectionProps = ComponentProps<"section"> & {
  end?: boolean;
};

export function Section({ end = false, className, ...props }: SectionProps) {
  const classes = [styles.section, end && styles.end, className].filter(Boolean).join(" ");
  return <section className={classes} {...props} />;
}
