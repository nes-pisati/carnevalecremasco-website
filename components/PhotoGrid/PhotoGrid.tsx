import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./PhotoGrid.module.css";

export type PhotoGridItem = {
  photo: PhotoData;
  placeholderColor: PhotoPlaceholderColor;
  wide?: boolean;
};

export function PhotoGrid({ items }: { items: PhotoGridItem[] }) {
  return (
    <ul role="list" className={styles.grid}>
      {items.map((item, index) => (
        <li key={`${item.photo.alt}-${index}`} className={item.wide ? styles.wide : undefined}>
          <Photo
            className={styles.tile}
            photo={item.photo}
            placeholderColor={item.placeholderColor}
            sizes={item.wide ? "(min-width: 901px) 50vw, 100vw" : "(min-width: 901px) 25vw, 50vw"}
          />
        </li>
      ))}
    </ul>
  );
}
