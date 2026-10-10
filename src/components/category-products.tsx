"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { SORT_OPTIONS, sortProducts, type SortKey } from "@/lib/products";
import { ProductCard } from "./product-card";

export function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm text-[var(--muted)]">সাজান:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm outline-none focus:border-[var(--primary)]"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
