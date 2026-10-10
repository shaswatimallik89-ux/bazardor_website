import type { Category, Product } from "./types";
import { toNumber } from "./format";

export type SortKey = "default" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export function sortProducts(products: Product[], key: SortKey): Product[] {
  if (key === "default") return products;
  const dir = key === "price-asc" ? 1 : -1;
  return [...products].sort((a, b) => (toNumber(a.today) - toNumber(b.today)) * dir);
}

export function productsInCategory(products: Product[], category: Category): Product[] {
  return products.filter((p) => p.category === category.slug || p.categoryNameBn === category.nameBn);
}

export interface PriceStats {
  min: number;
  max: number;
  avg: number;
}

export function marketStats(product: Product): PriceStats | null {
  const markets = (product.markets ?? []).filter(
    (m) => Number.isFinite(toNumber(m.min)) && Number.isFinite(toNumber(m.max)),
  );
  if (markets.length === 0) return null;
  const mins = markets.map((m) => toNumber(m.min));
  const maxs = markets.map((m) => toNumber(m.max));
  const mids = markets.map((_, i) => (mins[i] + maxs[i]) / 2);
  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
    avg: mids.reduce((a, b) => a + b, 0) / mids.length,
  };
}
