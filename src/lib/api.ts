import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export class ApiError extends Error {}

async function apiGet<T>(path: string): Promise<T> {
  let lastError: unknown = null;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
      });
      if (res.status === 429) throw new ApiError("অনেক বেশি অনুরোধ হয়েছে। একটু পরে আবার চেষ্টা করুন।");
      if (!res.ok) throw new ApiError(`সার্ভার ত্রুটি (${res.status})`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof ApiError
    ? lastError
    : new ApiError("ইন্টারনেট সংযোগ বা সার্ভার সমস্যা। পরে আবার চেষ্টা করুন।");
}

export async function getProducts(): Promise<Product[]> {
  const data = await apiGet<Product[]>("/products");
  return Array.isArray(data) ? data : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await apiGet<Product[] | Product>(`/products?slug=${encodeURIComponent(slug)}`);
  const list = Array.isArray(data) ? data : data ? [data] : [];
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiGet<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}
