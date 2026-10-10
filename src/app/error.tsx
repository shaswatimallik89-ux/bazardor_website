"use client";

import { ApiErrorState } from "@/components/api-error";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ApiErrorState message="কিছু একটা সমস্যা হয়েছে।" retryHref="/" />
      <button type="button" onClick={reset} className="mx-auto mt-4 block text-sm text-[var(--muted)] underline">
        এই পেজ আবার লোড করুন
      </button>
    </div>
  );
}
