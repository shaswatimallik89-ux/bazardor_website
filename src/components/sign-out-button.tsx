"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    const { error } = await authClient.signOut();
    setBusy(false);
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সাইন আউট হয়েছে।");
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={busy}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[var(--up)] px-4 text-sm font-medium text-[var(--up)] transition hover:bg-[var(--up)]/5 disabled:opacity-60"
    >
      {busy && <Loader2 size={14} className="animate-spin" aria-hidden />}
      {busy ? "সাইন আউট হচ্ছে…" : "↩ সাইন আউট"}
    </button>
  );
}
