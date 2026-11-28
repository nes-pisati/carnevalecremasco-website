import { PHOTO_SIZE, placeholderImage } from "./placeholder";
import type { NewsArticle } from "../types";

export const newsMock: NewsArticle[] = [
  {
    slug: "chiacchiere-e-tortelli-torna-in-piazza-aldo-moro",
    tag: "eventi",
    date: { year: 2026, month: 8, day: 11 },
    title: "Chiacchiere e Tortelli torna in piazza Aldo Moro",
    excerpt: "Dall’11 al 16 agosto tortelli cremaschi, musica dal vivo e allegria.",
    cover: { alt: "Foto: tortelli cremaschi sul banco della festa", file: placeholderImage("chiacchiere-e-tortelli-torna-in-piazza-aldo-moro", PHOTO_SIZE.landscape) },
    isFeatured: true,
    body: [],
  },
  {
    slug: "ai-guana-e-il-re-carnevale-2026",
    tag: "news",
    date: { year: 2026, month: 2, day: 22 },
    title: "Ai-Guana è il Re Carnevale 2026",
    excerpt: "Si chiude la 38ª edizione: tre domeniche di sole e oltre 10mila presenze a giornata.",
    cover: { alt: "Foto: il carro Ai-Guana festeggia la vittoria tra i coriandoli", file: placeholderImage("ai-guana-e-il-re-carnevale-2026", PHOTO_SIZE.landscape) },
    isFeatured: false,
    body: [
      {
        type: "paragraph",
        html: "<p>Si chiude la 38ª edizione del Carnevale Cremasco: tre domeniche di sole e oltre 10mila presenze a giornata nel centro di Crema.</p>",
      },
      { type: "heading", text: "Il voto del pubblico" },
      {
        type: "paragraph",
        html: "<p>A scegliere il Re Carnevale è stata ancora una volta la giuria popolare, che ha votato con il QR code lungo il percorso. Ha vinto Ai-Guana del Gruppo Quade con 5.588 voti.</p>",
      },
      {
        type: "paragraph",
        html: "<p>Sul podio anche W.A.R. – We Are Revolution di Next Level (5.498 voti) ed Esercito dei selfie dell’Istituto Ispe (4.958 voti).</p>",
      },
      {
        type: "quote",
        text: "[Dichiarazione del Gruppo Quade dopo la premiazione.]",
        citation: "[Nome, Gruppo Quade]",
      },
      { type: "heading", text: "Grazie a chi ha fatto festa con noi" },
      {
        type: "paragraph",
        html: "<p>[Ringraziamenti ai gruppi, ai volontari e agli sponsor da completare.]</p>",
      },
      {
        type: "attachment",
        title: "Comunicato stampa – Re Carnevale 2026",
        url: "#",
        fileType: "PDF",
        sizeInBytes: null,
      },
      { type: "floatRanking", editionYear: 2026 },
      { type: "editionGallery", editionYear: 2026 },
    ],
  },
  {
    slug: "gran-gala-del-carnevale-al-teatro-san-domenico",
    tag: "eventi",
    date: { year: 2026, month: 1, day: 23 },
    title: "Gran Galà del Carnevale al Teatro San Domenico",
    excerpt: "Serata inaugurale con l’orchestra di fiati “Il Trillo” e le musiche dei grandi film.",
    cover: { alt: "Foto: l’orchestra di fiati sul palco del Teatro San Domenico", file: placeholderImage("gran-gala-del-carnevale-al-teatro-san-domenico", PHOTO_SIZE.landscape) },
    isFeatured: false,
    body: [
      {
        type: "paragraph",
        html: "<p>Il Gran Galà del Carnevale apre la 38ª edizione con una serata di musica al Teatro San Domenico di Crema.</p>",
      },
      { type: "heading", text: "La serata" },
      {
        type: "paragraph",
        html: "<p>Sul palco l’orchestra di fiati “Il Trillo”, con un programma dedicato alle musiche dei grandi film. [Orario di inizio e programma completo da confermare.]</p>",
      },
      {
        type: "image",
        photo: {
          alt: "Foto: l’orchestra di fiati “Il Trillo” durante le prove",
          file: placeholderImage("gran-gala-orchestra", PHOTO_SIZE.landscape),
        },
        caption: "[Didascalia della foto]",
        credit: "[fotografo]",
      },
      {
        type: "quote",
        text: "[Citazione del direttore dell’orchestra o dell’associazione.]",
        citation: "[Nome, ruolo]",
      },
      { type: "heading", text: "Biglietti e prenotazioni" },
      {
        type: "paragraph",
        html: "<p>[Modalità di prenotazione e prezzi da confermare con il Teatro San Domenico.]</p>",
      },
      {
        type: "attachment",
        title: "Comunicato stampa – Gran Galà del Carnevale",
        url: "#",
        fileType: "PDF",
        sizeInBytes: null,
      },
      {
        type: "gallery",
        title: "Galleria",
        credit: "[fotografo]",
        photos: [1, 2, 3, 4].map((index) => ({
          alt: `Foto della serata ${index}`,
          file: placeholderImage(`gran-gala-${index}`, PHOTO_SIZE.landscape),
        })),
      },
    ],
  },
  {
    slug: "presentata-in-regione-la-38-edizione",
    tag: "news",
    date: { year: 2026, month: 1, day: null },
    title: "Presentata in Regione la 38ª edizione",
    excerpt: "Carri nuovi e un omaggio ai Giochi olimpici di Milano-Cortina.",
    cover: { alt: "Foto: la presentazione in Regione Lombardia", file: placeholderImage("presentata-in-regione-la-38-edizione", PHOTO_SIZE.landscape) },
    isFeatured: false,
    body: [],
  },
  {
    slug: "i-laboratori-del-carnevale-nei-campi-estivi",
    tag: "progetti",
    date: null,
    title: "I laboratori del Carnevale nei campi estivi",
    excerpt: "I volontari insegnano la cartapesta ai ragazzi.",
    cover: { alt: "Foto: ragazzi al lavoro sulla cartapesta", file: placeholderImage("i-laboratori-del-carnevale-nei-campi-estivi", PHOTO_SIZE.landscape) },
    isFeatured: false,
    body: [],
  },
];
