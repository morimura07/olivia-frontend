import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "vegetables",
    name: "Vegetables",
    emoji: "🥦",
    subcategories: [
      { slug: "leafy-greens", name: "Leafy greens" },
      { slug: "root-vegetables", name: "Root vegetables" },
      { slug: "peppers-chillies", name: "Peppers & chillies" },
      { slug: "onions-garlic", name: "Onions & garlic" },
    ],
  },
  {
    slug: "fruits",
    name: "Fruits",
    emoji: "🍎",
    subcategories: [
      { slug: "apples-pears", name: "Apples & pears" },
      { slug: "citrus", name: "Citrus" },
      { slug: "berries-grapes", name: "Berries & grapes" },
      { slug: "tropical", name: "Tropical" },
    ],
  },
  {
    slug: "dairy-eggs",
    name: "Dairy & Eggs",
    emoji: "🥛",
    subcategories: [
      { slug: "milk", name: "Milk" },
      { slug: "cheese", name: "Cheese" },
      { slug: "eggs", name: "Eggs" },
    ],
  },
  {
    slug: "bakery",
    name: "Bakery",
    emoji: "🥖",
    subcategories: [
      { slug: "bread", name: "Bread" },
      { slug: "pastries", name: "Pastries" },
    ],
  },
  {
    slug: "meat-fish",
    name: "Meat & Fish",
    emoji: "🍗",
    subcategories: [
      { slug: "poultry", name: "Poultry" },
      { slug: "beef", name: "Beef" },
      { slug: "seafood", name: "Seafood" },
    ],
  },
  {
    slug: "pantry",
    name: "Pantry",
    emoji: "🍚",
    subcategories: [
      { slug: "grains", name: "Rice & grains" },
      { slug: "oils", name: "Oils & condiments" },
      { slug: "spreads", name: "Honey & spreads" },
    ],
  },
  {
    slug: "beverages",
    name: "Beverages",
    emoji: "🧃",
    subcategories: [
      { slug: "juice", name: "Juice" },
      { slug: "coffee-tea", name: "Coffee & tea" },
      { slug: "water", name: "Water" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}
