"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validateName, validatePassword } from "@/lib/validation";
import { Field } from "./field";
import { SubmitButton } from "./submit-button";
import { SocialButtons } from "./social-buttons";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm", string | null>>;

export function SignUpForm({
  callbackUrl,
  providers,
}: {
  callbackUrl: string;
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const next: Errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: password !== confirm ? "পাসওয়ার্ড দুটি মিলছে না।" : null,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setLoading(true);
    const { error } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
    setLoading(false);

    if (error) {
      toast.error(
        error.status === 422
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।"
          : error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
      );
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। স্বাগতম!");
    router.replace(callbackUrl);
    router.refresh();
  }

  const signInHref = `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="নাম" name="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" error={errors.name} disabled={loading} />
        <Field label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} disabled={loading} />
        <Field label="পাসওয়ার্ড" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" error={errors.password} disabled={loading} />
        <Field label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" error={errors.confirm} disabled={loading} />
        <SubmitButton loading={loading} loadingText="অ্যাকাউন্ট তৈরি হচ্ছে…">অ্যাকাউন্ট তৈরি করুন</SubmitButton>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--border)]" /> অথবা <span className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <SocialButtons callbackUrl={callbackUrl} providers={providers} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signInHref} className="font-medium text-[var(--primary)] hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
