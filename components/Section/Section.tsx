import type { ComponentProps } from "react";
import styles from "./Section.module.css";

type SectionProps = Omit<ComponentProps<"section">, "ref"> & {
  end?: boolean;
  as?: "section" | "div";
};

export function Section({ end = false, as: Element = "section", className, ...props }: SectionProps) {
  const classes = [styles.section, end && styles.end, className].filter(Boolean).join(" ");
  return <Element className={classes} {...props} />;
}
