import { galleriesMock } from "./mock/galleries";
import type { Gallery, GalleryPhoto } from "./types";

export async function getGalleries(): Promise<Gallery[]> {
  return [...galleriesMock].sort((a, b) => (b.editionYear ?? 0) - (a.editionYear ?? 0));
}

export async function getEditionGallery(editionYear: number): Promise<Gallery | null> {
  return galleriesMock.find((gallery) => gallery.editionYear === editionYear) ?? null;
}

export function featuredPhotos(gallery: Gallery): GalleryPhoto[] {
  return gallery.photos.filter((photo) => photo.isFeatured);
}
