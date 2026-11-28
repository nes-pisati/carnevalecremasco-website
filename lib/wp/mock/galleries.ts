import { PHOTO_SIZE, placeholderImage } from "./placeholder";
import type { Gallery, GalleryPhoto } from "../types";

function photo(title: string, options: Partial<Pick<GalleryPhoto, "alt" | "eventLabel" | "isFeatured">> = {}): GalleryPhoto {
  return {
    title,
    alt: options.alt ?? `Foto: ${title}`,
    file: placeholderImage(`galleria-${title}`, PHOTO_SIZE.landscape),
    eventLabel: options.eventLabel ?? null,
    isFeatured: options.isFeatured ?? false,
  };
}

export const galleriesMock: Gallery[] = [
  {
    slug: "edizione-2026",
    title: "Galleria dell’edizione 2026",
    editionYear: 2026,
    credit: "[fotografo]",
    photos: [
      photo("Il carro Ai-Guana, Re Carnevale 2026"),
      photo("Il gruppo folkloristico boliviano"),
      photo("Il Gagèt apre la sfilata", { eventLabel: "1° corso mascherato 2026" }),
      photo("Bambini in maschera tra i coriandoli"),
      photo("Il carro Yellow Submarine in Piazza Giovanni XXIII", { isFeatured: true }),
      photo("La banda in piazza"),
      photo("Il carro Esercito dei selfie"),
      photo("Il pubblico lungo il percorso"),
      photo("Il mascherone di W.A.R. – We Are Revolution"),
      photo("La premiazione sul palco"),
      photo("Ballerini davanti al carro Yellow Submarine", { isFeatured: true }),
      photo("Il gruppo folkloristico boliviano in piazza", {
        alt: "Foto: il gruppo folkloristico boliviano",
        isFeatured: true,
      }),
      photo("Famiglia in maschera tra i coriandoli", { isFeatured: true }),
    ],
  },
];
