import Link from "next/link";

export function ApiErrorState({ message, retryHref = "/" }: { message: string; retryHref?: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
      <p className="font-medium">{message}</p>
      <Link
        href={retryHref}
        className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
      >
        আবার চেষ্টা করুন
      </Link>
    </div>
  );
}
