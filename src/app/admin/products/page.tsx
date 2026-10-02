import type { Metadata } from "next";
import { InventoryTable } from "@/components/admin/inventory-table";
import { getProduct, inventoryIds, products } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  // The seven rows from the spec first, then the rest of the catalogue.
  const first = inventoryIds.map(getProduct).filter((p): p is Product => !!p);
  const rest = products.filter((p) => !inventoryIds.includes(p.id));

  return (
    <>
      <h1 className="font-serif text-22 font-bold">Product &amp; inventory</h1>
      <InventoryTable products={[...first, ...rest]} />
    </>
  );
}
