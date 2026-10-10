export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8" aria-busy="true" aria-label="দাম লোড হচ্ছে">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-[var(--border)]" />
        <div className="space-y-2">
          <div className="h-6 w-32 animate-pulse rounded bg-[var(--border)]" />
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--border)]" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-[var(--border)]" />
        ))}
      </div>
    </div>
  );
}
