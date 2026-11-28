import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/wp/types";
import styles from "./Photo.module.css";

export type PhotoPlaceholderColor = "red" | "blue" | "sky" | "pink" | "cream" | "periwinkle" | "ink";

const PLACEHOLDER_CYCLE: readonly PhotoPlaceholderColor[] = ["red", "blue", "sky", "pink", "cream"];

export function cyclePlaceholder(index: number): PhotoPlaceholderColor {
  return PLACEHOLDER_CYCLE[index % PLACEHOLDER_CYCLE.length];
}

type PhotoProps = {
  photo: PhotoData;
  placeholderColor: PhotoPlaceholderColor;
  sizes: string;
  className?: string;
  preload?: boolean;
  fit?: "cover" | "contain";
};

export function Photo({ photo, placeholderColor, sizes, className, preload = false, fit = "cover" }: PhotoProps) {
  const classes = [styles.photo, styles[placeholderColor], className].filter(Boolean).join(" ");
  if (!photo.file) {
    return <span role="img" aria-label={photo.alt} className={classes} />;
  }
  return (
    <span className={classes}>
      <Image
        className={`${styles.image} ${styles[fit]}`}
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
