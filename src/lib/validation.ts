const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name: string): string | null {
  const v = name.trim();
  if (v.length < 2) return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
  if (v.length > 60) return "নাম ৬০ অক্ষরের বেশি হতে পারবে না।";
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "ইমেইল দিন।";
  if (!EMAIL_RE.test(email.trim())) return "সঠিক ইমেইল ঠিকানা দিন।";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "পাসওয়ার্ড দিন।";
  if (password.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (password.length > 128) return "পাসওয়ার্ড ১২৮ অক্ষরের বেশি হতে পারবে না।";
  return null;
}
