import fills from "./fills.module.css";

export type AccentColor = "red" | "blue" | "sky" | "pink" | "cream";

const ACCENT_CYCLE: readonly AccentColor[] = ["red", "blue", "sky", "pink"];

export function cycleAccent(index: number): AccentColor {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}

export function fillClass(color: AccentColor): string {
  return fills[color];
}
