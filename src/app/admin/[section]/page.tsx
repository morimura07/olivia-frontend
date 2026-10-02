import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { adminNav } from "@/lib/data/admin";

// Sections the MVP spec doesn't design yet.
const pending = ["customers", "delivery", "promotions", "settings"];

export function generateStaticParams() {
  return pending.map((section) => ({ section }));
}

function find(section: string) {
  return pending.includes(section) ? adminNav.find((n) => n.href === `/admin/${section}`) : undefined;
}

export async function generateMetadata({ params }: PageProps<"/admin/[section]">): Promise<Metadata> {
  return { title: find((await params).section)?.label ?? "Admin" };
}

export default async function SectionPage({ params }: PageProps<"/admin/[section]">) {
  const item = find((await params).section);
  if (!item) notFound();

  return (
    <>
      <h1 className="font-serif text-22 font-bold">{item.label}</h1>
      <div className="mt-4 grid place-items-center rounded-card bg-white px-6 py-16 text-center shadow-card">
        <span aria-hidden className="text-52">{item.emoji}</span>
        <p className="mt-3 font-serif text-18 font-bold">{item.label} is on the roadmap</p>
        <p className="mt-1 max-w-[360px] text-14 font-light text-muted">
          This screen isn&apos;t part of the MVP design spec yet. It will follow the same cards, tables and pills.
        </p>
        <ButtonLink href="/admin" variant="forest" className="mt-5">Back to dashboard</ButtonLink>
      </div>
    </>
  );
}
