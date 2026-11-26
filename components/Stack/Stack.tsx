import type { ComponentProps } from "react";
import styles from "./Stack.module.css";

type StackProps = ComponentProps<"div"> & {
  gap: 12 | 16 | 24;
};

export function Stack({ gap, className, ...props }: StackProps) {
  const classes = [styles.stack, styles[`gap${gap}`], className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}
