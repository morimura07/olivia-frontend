import { cn } from "@/lib/format";

/** "🫒 olivia." — the wordmark is Noto Serif Bold with a citrus full stop. */
export function Logo({
  size = 26,
  className,
  tag,
  dot = !tag,
}: {
  size?: number;
  className?: string;
  tag?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-baseline whitespace-nowrap font-serif font-bold text-white", className)}
      style={{ fontSize: size, lineHeight: 1.17 }}
    >
      <span aria-hidden className="font-sans">🫒</span>
      <span>&nbsp;olivia</span>
      {dot && <span className="text-citrus">{size >= 40 ? "." : " ."}</span>}
      {tag && (
        <span className="ml-[0.35em] font-serif text-11 tracking-[0.05em] text-white/60">{tag}</span>
      )}
    </span>
  );
}
