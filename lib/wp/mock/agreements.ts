import { googleMapsSearchUrl } from "@/lib/maps";
import { PHOTO_SIZE, placeholderImage } from "./placeholder";
import type { Agreement } from "../types";

export const agreementsMock: Agreement[] = [
  {
    slug: "la-campagnola",
    category: "food",
    name: "La Campagnola",
    address: "Via Ponte Rino 26, Campagnola Cremasca",
    phone: null,
    mapsUrl: googleMapsSearchUrl("La Campagnola, Via Ponte Rino 26, Campagnola Cremasca"),
    photo: { alt: "Foto: sala del ristorante La Campagnola", file: placeholderImage("la-campagnola", PHOTO_SIZE.card) },
  },
  {
    slug: "la-casa-del-pellegrino",
    category: "food",
    name: "La Casa del Pellegrino",
    address: "Crema · [indirizzo]",
    phone: null,
    mapsUrl: googleMapsSearchUrl("La Casa del Pellegrino, Crema"),
    photo: { alt: "Foto: La Casa del Pellegrino", file: placeholderImage("la-casa-del-pellegrino", PHOTO_SIZE.card) },
  },
  {
    slug: "trattoria-gobbato-da-pia",
    category: "food",
    name: "Trattoria Gobbato “Da Pia”",
    address: "Via Marco Biagi 31/33, Chieve",
    phone: null,
    mapsUrl: googleMapsSearchUrl("Trattoria Gobbato Da Pia, Via Marco Biagi 31, Chieve"),
    photo: { alt: "Foto: Trattoria Gobbato “Da Pia”", file: placeholderImage("trattoria-gobbato-da-pia", PHOTO_SIZE.card) },
  },
  {
    slug: "struttura-convenzionata-1",
    category: "lodging",
    name: "[Struttura convenzionata]",
    address: "[indirizzo]",
    phone: null,
    mapsUrl: null,
    photo: { alt: "Foto: struttura convenzionata", file: placeholderImage("struttura-convenzionata-1", PHOTO_SIZE.card) },
  },
  {
    slug: "struttura-convenzionata-2",
    category: "lodging",
    name: "[Struttura convenzionata]",
    address: "[indirizzo]",
    phone: null,
    mapsUrl: null,
    photo: { alt: "Foto: struttura convenzionata", file: placeholderImage("struttura-convenzionata-2", PHOTO_SIZE.card) },
  },
];
