import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Olivia Admin" },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-dvh md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-4 pt-6 pb-12 md:px-10 md:pt-7">
        <div className="mx-auto max-w-[1180px]">{children}</div>
      </main>
    </div>
  );
}
