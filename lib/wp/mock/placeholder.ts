import type { ImageFile } from "../types";

export const PHOTO_SIZE = {
  landscape: { width: 1200, height: 800 },
  card: { width: 800, height: 600 },
} as const;

export function placeholderImage(seed: string, size: { width: number; height: number }): ImageFile {
  return {
    url: `https://picsum.photos/seed/${encodeURIComponent(seed)}/${size.width}/${size.height}`,
    width: size.width,
    height: size.height,
  };
}
