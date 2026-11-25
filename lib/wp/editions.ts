import { editionsMock } from "./mock/editions";
import type { Edition, TicketPrice } from "./types";

export async function getEditions(): Promise<Edition[]> {
  return [...editionsMock].sort((a, b) => b.year - a.year);
}

export async function getCurrentEdition(): Promise<Edition> {
  const [latest] = await getEditions();
  if (!latest) throw new Error("Nessuna edizione disponibile");
  return latest;
}

export async function getEdition(year: number): Promise<Edition | null> {
  const editions = await getEditions();
  return editions.find((edition) => edition.year === year) ?? null;
}

export function findGroupTicket(edition: Edition): TicketPrice | null {
  return edition.ticketPrices.find((price) => price.isGroupTicket) ?? null;
}
