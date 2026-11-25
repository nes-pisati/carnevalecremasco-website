import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./Photo.module.css";

export type PhotoPlaceholderColor = "red" | "blue" | "sky" | "pink" | "cream" | "periwinkle" | "ink";

type PhotoProps = {
  photo: PhotoData;
  placeholderColor: PhotoPlaceholderColor;
  sizes: string;
  className?: string;
  preload?: boolean;
};

export function Photo({ photo, placeholderColor, sizes, className, preload = false }: PhotoProps) {
  const classes = [styles.photo, styles[placeholderColor], className].filter(Boolean).join(" ");
  if (!photo.file) {
    return <span role="img" aria-label={photo.alt} className={classes} />;
  }
  return (
    <span className={classes}>
      <Image
        className={styles.image}
        src={photo.file.url}
        width={photo.file.width}
        height={photo.file.height}
        alt={photo.alt}
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
      />
    </span>
  );
}
