export const adminNav = [
  { href: "/admin", emoji: "📊", label: "Dashboard" },
  { href: "/admin/orders", emoji: "📦", label: "Orders" },
  { href: "/admin/products", emoji: "🧺", label: "Products" },
  { href: "/admin/customers", emoji: "👥", label: "Customers" },
  { href: "/admin/delivery", emoji: "🚚", label: "Delivery" },
  { href: "/admin/promotions", emoji: "🏷️", label: "Promotions" },
  { href: "/admin/settings", emoji: "⚙️", label: "Settings" },
] as const;

export const stats = [
  { label: "Today's revenue", value: "$8,240", delta: 12.4, note: "vs yesterday", trend: [42, 48, 45, 52, 58, 55, 64] },
  { label: "Orders today", value: "312", delta: 6.1, trend: [30, 34, 31, 36, 35, 39, 41] },
  { label: "Avg. order value", value: "$26.40", delta: -1.2, trend: [28, 27.5, 27.9, 27, 26.8, 26.9, 26.4] },
  { label: "Active customers", value: "4,982", delta: 3.8, trend: [44, 45, 46, 46.5, 47.5, 48.6, 49.8] },
];

export type OrderStatus = "Preparing" | "En route" | "Delivered" | "Cancelled";

export const orders: Array<{
  id: string;
  customer: string;
  items: number;
  total: number;
  placed: string;
  status: OrderStatus;
  rider?: string;
}> = [
  { id: "HV-10456", customer: "Michael O.", items: 4, total: 21.55, placed: "5:12 pm", status: "En route", rider: "Dana R." },
  { id: "HV-10455", customer: "Priya S.", items: 9, total: 47.1, placed: "5:08 pm", status: "Preparing" },
  { id: "HV-10454", customer: "Luis G.", items: 3, total: 14.37, placed: "5:01 pm", status: "En route", rider: "Sam K." },
  { id: "HV-10453", customer: "Hannah W.", items: 12, total: 63.8, placed: "4:55 pm", status: "Delivered", rider: "Dana R." },
  { id: "HV-10452", customer: "Omar F.", items: 5, total: 28.94, placed: "4:47 pm", status: "Delivered", rider: "Jo T." },
  { id: "HV-10451", customer: "Grace L.", items: 2, total: 9.12, placed: "4:40 pm", status: "Cancelled" },
  { id: "HV-10450", customer: "Ben A.", items: 6, total: 31.6, placed: "4:33 pm", status: "Delivered", rider: "Sam K." },
];

export const orderStatusStyle: Record<OrderStatus, string> = {
  Preparing: "bg-sky text-[#3b5c9a]",
  "En route": "bg-cream text-amber",
  Delivered: "bg-mint text-leaf",
  Cancelled: "bg-blush text-tomato",
};
