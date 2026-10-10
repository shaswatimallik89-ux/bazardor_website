import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signInUrl } from "@/lib/redirect";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) redirect(signInUrl(returnTo));
  return session;
}
