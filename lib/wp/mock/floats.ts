import { PHOTO_SIZE, placeholderImage } from "./placeholder";
import type { Float } from "../types";

function float(rank: number, name: string, group: string, votes: number | null): Float {
  return {
    editionYear: 2026,
    rank,
    name,
    group,
    votes,
    photo: { alt: `Foto: carro ${name}`, file: placeholderImage(`carro-2026-${rank}`, PHOTO_SIZE.card) },
  };
}

export const floatsMock: Float[] = [
  float(1, "Ai-Guana", "Gruppo Quade", 5588),
  float(2, "W.A.R. – We Are Revolution", "Next Level", 5498),
  float(3, "Esercito dei selfie", "Istituto Ispe", 4958),
  float(4, "Sogna ragazzo sogna", "Gruppo Barabèt", 4859),
  float(5, "Yellow Submarine", "Diablada Boliviana", 4018),
  float(6, "[Nome carro]", "[Gruppo]", null),
  float(7, "[Nome carro]", "[Gruppo]", null),
  float(8, "[Nome carro]", "[Gruppo]", null),
];
