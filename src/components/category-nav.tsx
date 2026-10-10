"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="ক্যাটাগরি" className="overflow-x-auto">
      <ul className="mx-auto flex w-max max-w-6xl gap-1 px-4 py-2 sm:w-auto sm:flex-wrap">
        {categories.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;
          return (
            <li key={c.id}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--bg)]"
                }`}
              >
                <span aria-hidden>{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
