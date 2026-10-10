import Link from "next/link";
import type { Product } from "@/lib/types";
import { changeArrow, changeColor } from "@/lib/change";
import { formatPct, formatPrice, unitBn } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const p = product;
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--bg)] text-2xl"
        >
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.nameBn}</h3>
          <p className="text-xs text-[var(--muted)]">{unitBn(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[var(--muted)]">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatPrice(p.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`whitespace-nowrap rounded-full bg-[var(--bg)] px-2.5 py-1 text-xs font-semibold ${changeColor(p.change.dir)}`}
        >
          {changeArrow(p.change.dir)} {formatPct(p.change.pct)}
        </span>
      </div>
    </Link>
  );
}
