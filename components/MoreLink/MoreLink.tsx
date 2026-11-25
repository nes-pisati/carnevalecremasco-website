import Link from "next/link";
import styles from "./MoreLink.module.css";

type MoreLinkProps = {
  href: string;
  label: string;
  tone?: "light" | "dark";
};

export function MoreLink({ href, label, tone = "light" }: MoreLinkProps) {
  return (
    <Link href={href} className={`${styles.link} ${styles[tone]}`}>
      {label}
      <span aria-hidden="true">{"\u00a0→"}</span>
    </Link>
  );
}
