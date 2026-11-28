import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./ArticleGallery.module.css";

const TILE_PLACEHOLDERS: readonly PhotoPlaceholderColor[] = ["periwinkle", "pink", "sky", "cream"];
const WIDE_TILE_POSITIONS = new Set([0, 3]);

type ArticleGalleryProps = {
  title: string;
  credit: string | null;
  photos: PhotoData[];
  headingClassName: string;
};

export function ArticleGallery({ title, credit, photos, headingClassName }: ArticleGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div className={styles.gallery}>
      <h2 className={headingClassName}>{title}</h2>
      <ul role="list" className={styles.grid}>
        {photos.map((photo, index) => {
          const isWide = WIDE_TILE_POSITIONS.has(index % TILE_PLACEHOLDERS.length);
          return (
            <li key={`${index}-${photo.alt}`} className={isWide ? styles.wide : undefined}>
              <Photo
                className={styles.tile}
                photo={photo}
                placeholderColor={TILE_PLACEHOLDERS[index % TILE_PLACEHOLDERS.length]}
                sizes={isWide ? "(min-width: 901px) 500px, 100vw" : "(min-width: 901px) 250px, 50vw"}
              />
            </li>
          );
        })}
      </ul>
      {credit && <p className={styles.caption}>Foto di {credit}</p>}
    </div>
  );
}
