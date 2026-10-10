import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutButton } from "@/components/sign-out-button";
import { UpdateProfileForm } from "@/components/update-profile-form";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <UserAvatar name={user.name} image={user.image} size={80} />
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold">{user.name}</h2>
            <p className="truncate text-[var(--muted)]">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="mb-4 text-base font-semibold">তথ্য</h2>
        <UpdateProfileForm defaultName={user.name} />
      </section>
    </div>
  );
}
