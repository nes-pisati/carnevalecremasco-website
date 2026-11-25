import Link from "next/link";
import { Icon } from "@/components/Icon/Icon";
import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./PhotoBento.module.css";

type BentoVideo = {
  href: string;
  label: string;
};

type PhotoBentoProps = {
  photos: PhotoData[];
  video?: BentoVideo;
};

const TILE_LAYOUT = ["big", "small", "wide"] as const;
const TILE_PLACEHOLDERS: readonly PhotoPlaceholderColor[] = ["red", "blue", "periwinkle"];
const TILE_SIZES = {
  big: "(min-width: 901px) 50vw, 100vw",
  small: "(min-width: 901px) 25vw, 50vw",
  wide: "(min-width: 901px) 50vw, 100vw",
} as const;

export function PhotoBento({ photos, video }: PhotoBentoProps) {
  const tiles = photos.slice(0, TILE_LAYOUT.length).map((photo, index) => {
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
  });

  if (video) {
    tiles.splice(
      2,
      0,
      <li key="video" className={styles.tile}>
        <Link href={video.href} className={styles.video} aria-label={video.label}>
          <span className={styles.play}>
            <Icon name="play" size={22} />
          </span>
        </Link>
      </li>,
    );
  }

  return (
    <ul role="list" className={styles.bento}>
      {tiles}
    </ul>
  );
}
