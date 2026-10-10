import type { Product } from "@/lib/types";
import { formatPct, formatPrice, unitShortBn } from "@/lib/format";
import { changeColor, changeArrow } from "@/lib/change";

export function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const items = [...products, ...products];
  return (
    <div className="overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex">
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="flex items-center gap-2 whitespace-nowrap border-r border-[var(--border)] px-4 py-2.5 text-sm">
            <span aria-hidden>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-[var(--muted)]">
              {formatPrice(p.today)} টাকা/{unitShortBn(p.unit)}
            </span>
            <span className={`font-semibold ${changeColor(p.change.dir)}`}>
              {changeArrow(p.change.dir)} {formatPct(p.change.pct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
