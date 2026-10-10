export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-8" aria-busy="true" aria-label="দাম লোড হচ্ছে">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-2xl bg-[var(--border)]" />
      ))}
    </div>
  );
}
