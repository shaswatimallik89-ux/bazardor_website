import Image from "next/image";
import { todayBn } from "@/lib/format";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-[#dff3e6] px-3 py-1 text-xs font-medium text-[var(--primary)]">
            {todayBn()}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 max-w-md text-[var(--muted)]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[var(--primary)] px-6 font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)]"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="ফল ও সবজির ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
