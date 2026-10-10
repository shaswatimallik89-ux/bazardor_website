import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/home-data";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { ApiErrorState } from "@/components/api-error";
import { toBnDigits } from "@/lib/format";
import type { Product } from "@/lib/types";

export const revalidate = 300;

function Grid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  let products: Product[];
  try {
    products = await getProducts();
  } catch (err) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ApiErrorState message={err instanceof Error ? err.message : "দাম লোড করা যায়নি।"} />
      </div>
    );
  }

  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        {risers.length > 0 && (
          <section aria-labelledby="risers">
            <h2 id="risers" className="mb-4 text-xl font-bold">
              <span aria-hidden className="mr-1.5 text-[var(--up)]">▲</span>আজ দাম বেড়েছে
            </h2>
            <Grid products={risers} />
          </section>
        )}
        {fallers.length > 0 && (
          <section aria-labelledby="fallers">
            <h2 id="fallers" className="mb-4 text-xl font-bold">
              <span aria-hidden className="mr-1.5 text-[var(--down)]">▼</span>আজ দাম কমেছে
            </h2>
            <Grid products={fallers} />
          </section>
        )}
        <section id="সব-পণ্য" aria-labelledby="all" className="scroll-mt-4">
          <h2 id="all" className="text-xl font-bold">সব পণ্য</h2>
          <p className="mb-4 text-sm text-[var(--muted)]">
            মোট {toBnDigits(products.length)}টি পণ্যের আজকের দাম দেখানো হচ্ছে
          </p>
          <Grid products={products} />
        </section>
      </div>
    </>
  );
}
