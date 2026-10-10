export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8" aria-busy="true" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <div className="h-4 w-24 animate-pulse rounded bg-[var(--border)]" />
      <div className="h-24 animate-pulse rounded-2xl bg-[var(--border)]" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-[var(--border)]" />
        ))}
      </div>
      <div className="h-56 animate-pulse rounded-xl bg-[var(--border)]" />
    </div>
  );
}
