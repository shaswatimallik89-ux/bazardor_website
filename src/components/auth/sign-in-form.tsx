"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validatePassword } from "@/lib/validation";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";
import { SocialButtons } from "./social-buttons";

export function SignInForm({
  callbackUrl,
  providers,
}: {
  callbackUrl: string;
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const next = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(next);
    if (next.email || next.password) return;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      toast.error(
        error.status === 401 || error.status === 400
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
          : error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      );
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.replace(callbackUrl);
    router.refresh();
  }

  const signUpHref = `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} disabled={loading} />
        <Field label="পাসওয়ার্ড" name="password" type="password" autoComplete="current-password" placeholder="কমপক্ষে ৮ অক্ষর" error={errors.password} disabled={loading} />
        <SubmitButton loading={loading} loadingText="সাইন ইন হচ্ছে…">সাইন ইন</SubmitButton>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--border)]" /> অথবা <span className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <SocialButtons callbackUrl={callbackUrl} providers={providers} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signUpHref} className="font-medium text-[var(--primary)] hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

