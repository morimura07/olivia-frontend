import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/shop/category-view";
import { categories, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getCategory(slug)?.name ?? "Category" };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <CategoryView category={category} products={getProductsByCategory(category.slug)} />;
}
