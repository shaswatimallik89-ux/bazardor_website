export function UserAvatar({
  name,
  image,
  size = 40,
}: {
  name: string;
  image?: string | null;
  size?: number;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const style = { width: size, height: size };
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt="" referrerPolicy="no-referrer" style={style} className="shrink-0 rounded-xl object-cover" />
    );
  }
  return (
    <span
      aria-hidden
      style={{ ...style, fontSize: size * 0.45 }}
      className="flex shrink-0 items-center justify-center rounded-xl bg-[#dff3e6] font-semibold text-[var(--primary)]"
    >
      {initial}
    </span>
  );
}
