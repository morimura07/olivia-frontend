import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { categories } from "@/lib/data/categories";
import { container } from "@/lib/layout";
import { cn } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-16 bg-forest text-mist">
      <div className={cn(container, "grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
        <div>
          <Logo size={26} />
          <p className="mt-3 max-w-[300px] text-14 leading-[1.5] font-light">
            Fresh produce, dairy and pantry staples from local farms — delivered to your door in 45 minutes.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-14 font-bold text-white">Shop</h2>
          <ul className="mt-3 space-y-2 text-14 font-light">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-14 font-bold text-white">Account</h2>
          <ul className="mt-3 space-y-2 text-14 font-light">
            <li><Link href="/cart" className="transition-colors hover:text-white">Cart</Link></li>
            <li><Link href="/wishlist" className="transition-colors hover:text-white">Saved items</Link></li>
            <li><Link href="/account" className="transition-colors hover:text-white">Orders</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-14 font-bold text-white">Olivia for teams</h2>
          <ul className="mt-3 space-y-2 text-14 font-light">
            <li><Link href="/admin" className="transition-colors hover:text-white">Admin console</Link></li>
            <li><Link href="/rider" className="transition-colors hover:text-white">Delivery partners</Link></li>
            <li><Link href="/design-system" className="transition-colors hover:text-white">Design system</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className={cn(container, "py-5 text-12 font-light text-mist/70")}>
          © {new Date().getFullYear()} Olivia Super Market · Austin, TX
        </p>
      </div>
    </footer>
  );
}
