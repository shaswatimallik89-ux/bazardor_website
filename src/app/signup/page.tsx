import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { enabledProviders } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { safeRedirect } from "@/lib/redirect";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = { title: "সাইন আপ — বাজার দর" };
export const dynamic = "force-dynamic";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const dest = safeRedirect(callbackUrl);
  if (await getSession()) redirect(dest);

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-[var(--muted)]">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>
      <SignUpForm callbackUrl={dest} providers={enabledProviders} />
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-[var(--muted)] hover:text-[var(--ink)]">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
