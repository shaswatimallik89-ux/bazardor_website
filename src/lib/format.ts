const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

export function fromBnDigits(value: string): number {
  const ascii = value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
  return Number(ascii.replace(/,/g, ""));
}

export function formatPrice(value: number): string {
  return toBnDigits(value.toLocaleString("en-US"));
}

export function formatPct(value: number): string {
  return toBnDigits(Math.abs(value).toFixed(1)) + "%";
}

export function unitBn(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? `প্রতি ${unit}`;
}

export function todayBn(now: Date = new Date()): string {
  const s = now.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return s;
}

export function unitShortBn(unit: string): string {
  const map: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
  return map[unit] ?? unit;
}

export function toNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const n = fromBnDigits(value);
  return Number.isFinite(n) ? n : 0;
}
