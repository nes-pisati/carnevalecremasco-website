import { cyclePlaceholder, Photo } from "@/components/Photo/Photo";
import { formatVotes } from "@/lib/format";
import type { Float } from "@/lib/wp/types";
import styles from "./CarroCard.module.css";

export function CarroCard({ float }: { float: Float }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Photo
          className={styles.photo}
          photo={float.photo}
          placeholderColor={cyclePlaceholder(float.rank - 1)}
          sizes="(min-width: 901px) 20vw, 240px"
        />
        <span className={styles.rank}>
          <span className="visually-hidden">Posizione </span>
          {float.rank}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{float.name}</h3>
        <p className={styles.meta}>
          {float.group} · {formatVotes(float.votes)}
        </p>
      </div>
    </article>
  );
}

type CarroScrollerProps = {
  floats: Float[];
  labelledBy: string;
};

export function CarroScroller({ floats, labelledBy }: CarroScrollerProps) {
  return (
    <div className={styles.scroller} role="region" aria-labelledby={labelledBy} tabIndex={0}>
      <ol role="list" className={styles.list}>
        {floats.map((float) => (
          <li key={float.rank} className={styles.item}>
            <CarroCard float={float} />
          </li>
        ))}
      </ol>
    </div>
  );
}
