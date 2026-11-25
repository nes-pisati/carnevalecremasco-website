import type { ComponentProps } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./Band.module.css";

export function Band({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={[styles.band, className].filter(Boolean).join(" ")} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
