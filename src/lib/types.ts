export type Tint = "peach" | "mint" | "sky" | "aqua" | "apricot" | "blush" | "wheat" | "cream";

export type CategorySlug =
  | "vegetables"
  | "fruits"
  | "dairy-eggs"
  | "bakery"
  | "meat-fish"
  | "pantry"
  | "beverages";

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  emoji: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Compact name for small tiles, e.g. "Sourdough". */
  shortName?: string;
  /** Pack size shown under the name, e.g. "1 kg pack". */
  size: string;
  /** Short size used in the admin table, e.g. "1 kg". */
  shortSize: string;
  price: number;
  oldPrice?: number;
  /** Marketing discount label when it differs from the exact maths (spec: apples -20%). */
  savePct?: number;
  emoji: string;
  /** Icon used in admin/inventory rows when it differs from the card icon. */
  rowEmoji?: string;
  tint: Tint;
  category: CategorySlug;
  subcategory: string;
  organic?: boolean;
  local?: boolean;
  stock: number;
  rating: number;
  reviews: number;
  description: string;
  /** Small tag shown above the title on the product page. */
  tag?: string;
  deal?: boolean;
  pairsWith?: string[];
}

export type StockStatus = "active" | "low" | "restock";
