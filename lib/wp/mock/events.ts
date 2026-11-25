import type { CarnivalEvent } from "../types";

const paradeHighlights = [
  "Sfilata dei carri allegorici e dei mascheroni",
  "Soggetti speciali",
  "Bande musicali",
  "Gruppi folcloristici",
  "Isola dei bambini",
  "Mercatini di Carnevale in Piazza Duomo",
];

const paradeMarket: CarnivalEvent["market"] = {
  place: "Piazza Duomo",
  time: { start: "09:00", end: "19:00" },
};

export const eventsMock: CarnivalEvent[] = [
  {
    editionYear: 2027,
    date: "2027-01-24",
    kind: "opening",
    title: "Aspettando il Carnevale",
    note: null,
    time: { start: "15:00", end: "18:00" },
    place: "Piazza Duomo",
    isFree: true,
    market: null,
    highlights: ["Animazione musicale", "Maschere e intrattenimento", "A cura di CremaLiveArt"],
  },
  {
    editionYear: 2027,
    date: "2027-01-31",
    kind: "parade",
    title: "1° corso mascherato",
    note: null,
    time: { start: "14:30", end: null },
    place: "Piazza Giovanni XXIII",
    isFree: false,
    market: paradeMarket,
    highlights: paradeHighlights,
  },
  {
    editionYear: 2027,
    date: "2027-02-07",
    kind: "parade",
    title: "2° corso mascherato",
    note: null,
    time: { start: "14:30", end: null },
    place: "Piazza Giovanni XXIII",
    isFree: false,
    market: paradeMarket,
    highlights: paradeHighlights,
  },
  {
    editionYear: 2027,
    date: "2027-02-14",
    kind: "finale",
    title: "3° corso mascherato e premiazione",
    note: null,
    time: { start: "14:30", end: null },
    place: "Piazza Giovanni XXIII",
    isFree: false,
    market: paradeMarket,
    highlights: [...paradeHighlights, "Premiazione del Re Carnevale"],
  },
];
