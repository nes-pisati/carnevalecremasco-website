import { Photo, type PhotoPlaceholderColor } from "@/components/Photo/Photo";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./CaptionedPhoto.module.css";

type CaptionedPhotoProps = {
  photo: PhotoData;
  caption: string;
  placeholderColor: PhotoPlaceholderColor;
  sizes: string;
};

export function CaptionedPhoto({ photo, caption, placeholderColor, sizes }: CaptionedPhotoProps) {
  return (
    <figure className={styles.figure}>
      <Photo photo={photo} placeholderColor={placeholderColor} sizes={sizes} className={styles.media} />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
