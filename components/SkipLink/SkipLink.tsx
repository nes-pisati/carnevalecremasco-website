import styles from "./SkipLink.module.css";

type SkipLinkProps = {
  targetId: string;
};

export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      Vai al contenuto
    </a>
  );
}
