import Link from "next/link";
import styles from "./MoreLink.module.css";

type Tone = "light" | "dark";

type MoreLinkProps = {
  href: string;
  label: string;
  tone?: Tone;
};

function MoreLabel({ label }: { label: string }) {
  return (
    <span>
      {label}
      <span aria-hidden="true">{" →"}</span>
    </span>
  );
}

export function MoreLink({ href, label, tone = "light" }: MoreLinkProps) {
  return (
    <Link href={href} className={`${styles.link} ${styles[tone]}`}>
      <MoreLabel label={label} />
    </Link>
  );
}

type MoreButtonProps = {
  label: string;
  onClick: () => void;
  tone?: Tone;
};

export function MoreButton({ label, onClick, tone = "light" }: MoreButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`${styles.link} ${styles.button} ${styles[tone]}`}>
      <MoreLabel label={label} />
    </button>
  );
}
