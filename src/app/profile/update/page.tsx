import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import { UpdateProfileForm } from "@/components/update-profile-form";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };
export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8">
      <Link href="/profile" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <h1 className="mt-3 text-2xl font-bold">তথ্য আপডেট</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">আপনার নাম পরিবর্তন করুন।</p>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <UpdateProfileForm defaultName={user.name} redirectTo="/profile" />
      </div>
    </div>
  );
}
