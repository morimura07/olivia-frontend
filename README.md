# Olivia Super Market — MVP frontend

Next.js 16 (App Router) + Tailwind CSS v4 + Zustand, built from
`Olivia Super Market — UI_UX Design Spec.pdf`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Screens

| Route | Spec screen |
|---|---|
| `/` | Home: hero, shop by category, this week's deals |
| `/category/[slug]` | Category listing with sidebar, subcategories and filters |
| `/product/[slug]` | Product detail + frequently bought together |
| `/cart` | Cart + order summary |
| `/admin` | Admin dashboard (stats, low stock alerts) |
| `/admin/products` | Product & inventory table |
| `/rider` | Delivery partner app (live inside the phone mockup on desktop, full screen on mobile) |
| `/design-system` | Spec cover page: palette, buttons, goods icons, product card |

Not in the spec, built in the same style: `/checkout`, `/search`, `/wishlist`,
`/account`, `/admin/orders`, and placeholders for the other admin sections.

## Where things live

- `src/app/globals.css` — design tokens measured from the PDF (colours, type
  scale, radii, shadows). The PDF was printed from a 794px-wide page at 0.75
  scale, so every value is `pt ÷ 0.75` px.
- `src/lib/data/*` — mock catalogue, categories and admin data. Swap these for
  API calls when a backend exists.
- `src/lib/store/*` — cart, wishlist (persisted to localStorage) and toasts.
- `src/lib/pricing.ts` — delivery fee ($2.99, free over $35) and tax (6.3%).
- `src/components/{ui,shop,admin,rider}` — components by surface.

Fonts: Roboto (300/400/500/700), Noto Serif Bold, Noto Color Emoji and Noto
Sans Symbols, self-hosted via `next/font` so the emoji goods icons look the
same on every OS.
