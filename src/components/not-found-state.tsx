import Link from "next/link";

export function NotFoundState({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <p aria-hidden className="text-5xl">🧺</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-[var(--muted)]">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
