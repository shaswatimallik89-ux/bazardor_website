import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export function Field({ label, error, id, ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`min-h-11 w-full rounded-lg border bg-[var(--surface)] px-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 disabled:opacity-60 ${
          error ? "border-[var(--up)]" : "border-[var(--border)]"
        }`}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="mt-1 text-xs text-[var(--up)]">
          {error}
        </p>
      )}
    </div>
  );
}
