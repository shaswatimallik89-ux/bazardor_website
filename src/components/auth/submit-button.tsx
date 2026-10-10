import { Loader2 } from "lucide-react";

export function SubmitButton({
  loading,
  children,
  loadingText,
}: {
  loading: boolean;
  children: React.ReactNode;
  loadingText: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
      {loading ? loadingText : children}
    </button>
  );
}
