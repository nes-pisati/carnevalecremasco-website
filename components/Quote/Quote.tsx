import styles from "./Quote.module.css";

type QuoteProps = {
  text: string;
  citation: string | null;
};

export function Quote({ text, citation }: QuoteProps) {
  return (
    <figure className={styles.quote}>
      <span className={styles.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={styles.text}>
        <p>{text}</p>
      </blockquote>
      {citation && <figcaption className={styles.citation}>— {citation}</figcaption>}
    </figure>
  );
}
