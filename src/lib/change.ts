import type { ChangeDir } from "./types";

export function changeColor(dir: ChangeDir): string {
  if (dir === "up") return "text-[var(--up)]";
  if (dir === "down") return "text-[var(--down)]";
  return "text-[var(--flat)]";
}

export function changeArrow(dir: ChangeDir): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}
