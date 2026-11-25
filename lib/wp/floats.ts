import { floatsMock } from "./mock/floats";
import type { Float } from "./types";

export async function getFloats(editionYear: number): Promise<Float[]> {
  return floatsMock
    .filter((float) => float.editionYear === editionYear)
    .sort((a, b) => a.rank - b.rank);
}

export async function getLatestRankedEditionYear(): Promise<number | null> {
  const years = floatsMock.map((float) => float.editionYear);
  return years.length > 0 ? Math.max(...years) : null;
}
