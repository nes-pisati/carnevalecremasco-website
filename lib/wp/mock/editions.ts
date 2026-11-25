import type { Edition } from "../types";
import { PHOTO_SIZE, placeholderImage } from "./placeholder";

export const editionsMock: Edition[] = [
  {
    year: 2026,
    number: 38,
    ticketPrices: [],
    heroPhoto: {
      alt: "Foto: il carro Ai-Guana durante la premiazione",
      file: placeholderImage("hero-2026", PHOTO_SIZE.landscape),
    },
  },
  {
    year: 2027,
    number: 39,
    ticketPrices: [
      { label: "Intero", detail: null, priceInEuro: 10, isGroupTicket: false },
      {
        label: "Comitive",
        detail: "Minimo 15 adulti, preavviso di 2 giorni via email",
        priceInEuro: 8,
        isGroupTicket: true,
      },
      { label: "Ridotto", detail: "Bambini dai 9 ai 14 anni", priceInEuro: 5, isGroupTicket: false },
      { label: "Bambini fino a 8 anni", detail: null, priceInEuro: null, isGroupTicket: false },
      {
        label: "Aspettando il Carnevale",
        detail: "Domenica 24 gennaio, Piazza Duomo",
        priceInEuro: null,
        isGroupTicket: false,
      },
    ],
    heroPhoto: {
      alt: "Foto: ballerini e pubblico davanti a un carro allegorico in piazza",
      file: placeholderImage("hero-2027", PHOTO_SIZE.landscape),
    },
  },
];
