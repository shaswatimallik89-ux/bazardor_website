import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { marketStats } from "@/lib/products";
import { changeArrow, changeColor } from "@/lib/change";
import { formatPct, formatPrice, toBnDigits, unitBn } from "@/lib/format";
import { ApiErrorState } from "@/components/api-error";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

function decodeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${decodeSlug(slug)} — বাজার দর` };
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone ?? ""}`}>{value}</p>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);
  await requireSession(`/product/${rawSlug}`);

  let product: Product | null;
  try {
    product = await getProductBySlug(slug);
  } catch (err) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <ApiErrorState
          message={err instanceof ApiError ? err.message : "পণ্যের তথ্য লোড করা যায়নি।"}
          retryHref={`/product/${rawSlug}`}
        />
      </div>
    );
  }
  if (!product) notFound();

  const stats = marketStats(product);
  const markets = product.markets ?? [];
  const taka = (n: number) => `${formatPrice(Math.round(n * 100) / 100)} টাকা`;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">← সব পণ্য</Link>

      <header className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--bg)] text-4xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold">{product.nameBn}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
            <span>{product.categoryIcon} {product.categoryNameBn}</span>
            <span aria-hidden>•</span>
            <span>{unitBn(product.unit)}</span>
          </p>
        </div>
      </header>

      <section aria-label="আজকের দাম" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="col-span-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 lg:col-span-1">
          <p className="text-xs text-[var(--muted)]">আজকের দাম</p>
          <p className="mt-1 text-2xl font-bold">{taka(product.today)}</p>
          <p className={`mt-1 text-sm font-semibold ${changeColor(product.change.dir)}`}>
            {changeArrow(product.change.dir)} {formatPct(product.change.pct)}
          </p>
        </div>
        <Stat label="সর্বনিম্ন দাম" value={stats ? taka(stats.min) : "—"} tone="text-[var(--down)]" />
        <Stat label="সর্বোচ্চ দাম" value={stats ? taka(stats.max) : "—"} tone="text-[var(--up)]" />
        <Stat label="গড় দাম" value={stats ? taka(stats.avg) : "—"} />
      </section>

      <section aria-label="দামের তুলনা" className="grid grid-cols-3 gap-3">
        {[
          ["গতকাল", product.yesterday],
          ["গত সপ্তাহ", product.lastWeek],
          ["গত মাস", product.lastMonth],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
            <p className="text-xs text-[var(--muted)]">{label}</p>
            <p className="mt-1 font-semibold">{formatPrice(value as number)} <span className="text-xs font-medium">টাকা</span></p>
          </div>
        ))}
      </section>

      <section aria-labelledby="markets">
        <h2 id="markets" className="text-lg font-bold">বাজারভিত্তিক দাম</h2>
        <p className="mb-3 text-sm text-[var(--muted)]">
          {markets.length > 0
            ? `মোট ${toBnDigits(markets.length)}টি বাজারের দাম (${unitBn(product.unit)})`
            : "এই পণ্যের জন্য বাজারভিত্তিক দাম পাওয়া যায়নি।"}
        </p>

        {markets.length > 0 && (
          <>
            <ul className="space-y-2 sm:hidden">
              {markets.map((m, i) => (
                <li key={`${m.market}-${i}`} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="font-semibold">{m.market}</p>
                  <p className="text-xs text-[var(--muted)]">{m.division}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>সর্বনিম্ন: <b>{formatPrice(m.min)} টাকা</b></span>
                    <span>সর্বোচ্চ: <b>{formatPrice(m.max)} টাকা</b></span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] sm:block">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-[var(--bg)] text-xs text-[var(--muted)]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">বাজার</th>
                    <th scope="col" className="px-4 py-3 font-medium">বিভাগ</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">সর্বনিম্ন (টাকা)</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">সর্বোচ্চ (টাকা)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {markets.map((m, i) => (
                    <tr key={`${m.market}-${i}`}>
                      <th scope="row" className="px-4 py-3 font-medium">{m.market}</th>
                      <td className="px-4 py-3 text-[var(--muted)]">{m.division}</td>
                      <td className="px-4 py-3 text-right">{formatPrice(m.min)}</td>
                      <td className="px-4 py-3 text-right">{formatPrice(m.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
