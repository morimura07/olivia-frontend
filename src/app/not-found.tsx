import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="text-center">
        <span aria-hidden className="inline-block animate-float text-[80px]">🥕</span>
        <h1 className="mt-4 font-serif text-28 font-bold">This aisle is empty</h1>
        <p className="mt-2 text-16 font-light text-muted">We couldn&apos;t find that page. Let&apos;s get you back to the fresh stuff.</p>
        <ButtonLink href="/" className="mt-6">Back to the shop</ButtonLink>
      </div>
    </div>
  );
}
