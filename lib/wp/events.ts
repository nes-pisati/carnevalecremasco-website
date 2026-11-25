import { eventsMock } from "./mock/events";
import type { CarnivalEvent } from "./types";

export async function getEvents(editionYear: number): Promise<CarnivalEvent[]> {
  return eventsMock
    .filter((event) => event.editionYear === editionYear)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function eventAnchor(event: CarnivalEvent): string {
  return `d${Number(event.date.slice(8, 10))}`;
}
