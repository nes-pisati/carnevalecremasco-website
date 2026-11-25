import fills from "./fills.module.css";

export type AccentColor = "red" | "blue" | "sky" | "pink" | "cream";

export function fillClass(color: AccentColor): string {
  return fills[color];
}
