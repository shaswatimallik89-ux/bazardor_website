import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import { todayBn } from "@/lib/format";
import { getSession } from "@/lib/session";
import { UserMenu } from "./user-menu";
import { PriceTicker } from "./price-ticker";
import { CategoryNav } from "./category-nav";

export async function SiteHeader() {
  const [categories, products, session] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
    getSession().catch(() => null),
  ]);

  return (
    <header className="relative">
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Image src="/logo-icon.png" alt="" width={20} height={20} priority />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-lg font-bold">বাজার দর</span>
              <span className="block truncate text-xs text-[var(--muted)]">{todayBn()}</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1 text-sm sm:gap-2">
            {session ? (
              <UserMenu name={session.user.name} image={session.user.image} />
            ) : (
              <>
                <Link href="/signin" className="inline-flex min-h-10 items-center rounded-lg px-2 font-medium hover:bg-[var(--bg)] sm:px-3">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex min-h-10 items-center rounded-lg bg-[var(--primary)] px-3 font-semibold sm:px-4 text-white shadow-sm hover:bg-[var(--primary-hover)]"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="border-t border-[var(--border)]">
          {categories.length > 0 && <CategoryNav categories={categories} />}
        </div>
      </div>
      <PriceTicker products={products} />
    </header>
  );
}
