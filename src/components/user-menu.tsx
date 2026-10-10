"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "./user-avatar";

export function UserMenu({ name, image }: { name: string; image?: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const firstName = name.trim().split(/\s+/)[0] || name;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function signOut() {
    setBusy(true);
    const { error } = await authClient.signOut();
    setBusy(false);
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    setOpen(false);
    toast.success("সাইন আউট হয়েছে।");
    router.replace("/");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex min-h-11 items-center gap-2 rounded-full px-1.5 text-sm font-medium hover:bg-[var(--bg)]"
      >
        <UserAvatar name={name} image={image} size={36} />
        <span className="hidden max-w-[8rem] truncate sm:inline">{firstName}</span>
        <span aria-hidden className="text-[10px] text-[var(--muted)]">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-lg"
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--bg)]"
          >
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={signOut}
            disabled={busy}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--up)] hover:bg-[var(--bg)] disabled:opacity-60"
          >
            {busy ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}
