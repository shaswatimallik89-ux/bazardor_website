import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, getCategories, getProducts } from "@/lib/api";
import { productsInCategory } from "@/lib/products";
import { toBnDigits } from "@/lib/format";
import { ApiErrorState } from "@/components/api-error";
import { CategoryProducts } from "@/components/category-products";
import type { Category, Product } from "@/lib/types";

export const revalidate = 300;

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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = decodeSlug(rawSlug);

  let categories: Category[];
  let products: Product[];
  try {
    [categories, products] = await Promise.all([getCategories(), getProducts()]);
  } catch (err) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ApiErrorState
          message={err instanceof ApiError ? err.message : "দাম লোড করা যায়নি।"}
          retryHref={`/category/${rawSlug}`}
        />
      </div>
    );
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = productsInCategory(products, category);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">← হোম</Link>
      <header className="mb-6 mt-3 flex items-center gap-3">
        <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)] text-3xl shadow-sm">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-[var(--muted)]">মোট {toBnDigits(items.length)}টি পণ্য</p>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <p aria-hidden className="text-4xl">🧺</p>
          <p className="mt-3 font-medium">এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।</p>
          <Link
            href="/"
            className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategoryProducts products={items} />
      )}
    </div>
  );
}
