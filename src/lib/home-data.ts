import type { Product } from "./types";

export function topRisers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}

export function topFallers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);
}
