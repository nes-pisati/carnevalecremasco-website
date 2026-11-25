import type { ReactNode } from "react";
import { Photo } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./Hero.module.css";

type HeroProps = {
  badges: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  actions: ReactNode;
  photo: PhotoData;
};

export function Hero({ badges, title, lead, actions, photo }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.row}>{badges}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        <div className={styles.row}>{actions}</div>
      </div>
      <div className={styles.art}>
        <span className={styles.disc} aria-hidden="true" />
        <span className={styles.half} aria-hidden="true" />
        <span className={styles.tile} aria-hidden="true" />
        <Photo
          className={styles.photo}
          photo={photo}
          placeholderColor="periwinkle"
          sizes="(min-width: 901px) 50vw, 100vw"
          preload
        />
        <svg className={styles.wave} aria-hidden="true" focusable="false" viewBox="0 0 140 40">
          <path d="M4 20 q16 -18 32 0 t32 0 t32 0 t32 0" />
        </svg>
      </div>
    </section>
  );
}
