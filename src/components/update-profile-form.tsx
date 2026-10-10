"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validateName } from "@/lib/validation";
import { Field } from "./auth/field";
import { SubmitButton } from "./auth/submit-button";

export function UpdateProfileForm({
  defaultName,
  redirectTo,
}: {
  defaultName: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    const msg = validateName(name);
    setError(msg);
    if (msg) return;

    setLoading(true);
    const { error: updateError } = await authClient.updateUser({ name });
    setLoading(false);

    if (updateError) {
      toast.error(updateError.message || "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
    if (redirectTo) router.push(redirectTo);
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4"
    >
      <Field label="নাম" name="name" autoComplete="name" defaultValue={defaultName} error={error} disabled={loading} />
      <SubmitButton loading={loading} loadingText="আপডেট হচ্ছে…">আপডেট</SubmitButton>
    </form>
  );
}
