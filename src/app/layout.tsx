import type { Metadata, Viewport } from "next";
import { Noto_Color_Emoji, Noto_Sans_Symbols, Noto_Serif, Roboto } from "next/font/google";
import { StoreHydration } from "@/components/providers/store-hydration";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const roboto = Roboto({
  variable: "--nf-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--nf-serif",
  subsets: ["latin"],
  weight: ["700"],
});

// The spec draws every product as a Noto Color Emoji glyph; loading it keeps
// the goods icons identical on Windows, macOS, Android and iOS.
const emoji = Noto_Color_Emoji({
  variable: "--nf-emoji",
  subsets: ["emoji"],
  weight: "400",
  preload: false,
});

// ♡ ★ ☐ ▲ ▼ ✓ ☰ are rendered with Noto Sans Symbols in the spec.
const symbols = Noto_Sans_Symbols({
  variable: "--nf-symbols",
  subsets: ["symbols"],
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Olivia Super Market — fresh groceries in 45 minutes",
    template: "%s · Olivia Super Market",
  },
  description:
    "Fresh produce, dairy, bakery and pantry staples from Olivia Super Market, delivered before dinner.",
};

export const viewport: Viewport = {
  themeColor: "#12331b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${notoSerif.variable} ${emoji.variable} ${symbols.variable}`}
    >
      <body className="min-h-dvh">
        <StoreHydration />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
