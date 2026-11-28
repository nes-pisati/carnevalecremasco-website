import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./PhotoBento.module.css";

type PhotoBentoProps = {
  photos: PhotoData[];
};

const TILE_LAYOUT = ["big", "small", "small", "wide"] as const;
const TILE_PLACEHOLDERS: readonly PhotoPlaceholderColor[] = ["red", "blue", "sky", "periwinkle"];
const TILE_SIZES = {
  big: "(min-width: 901px) 50vw, 100vw",
  small: "(min-width: 901px) 25vw, 50vw",
  wide: "(min-width: 901px) 50vw, 100vw",
} as const;

export function PhotoBento({ photos }: PhotoBentoProps) {
  return (
    <ul role="list" className={styles.bento}>
      {photos.slice(0, TILE_LAYOUT.length).map((photo, index) => {
        const layout = TILE_LAYOUT[index];
        return (
          <li key={`${index}-${photo.alt}`} className={`${styles.tile} ${styles[layout]}`}>
            <Photo
              className={styles.photo}
              photo={photo}
              placeholderColor={TILE_PLACEHOLDERS[index]}
              sizes={TILE_SIZES[layout]}
            />
          </li>
        );
      })}
    </ul>
  );
}
