import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SkipLink } from "@/components/SkipLink/SkipLink";
import "./globals.css";

const unbounded = localFont({
  src: [
    { path: "./fonts/unbounded-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/unbounded-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/unbounded-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-unbounded",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carnevale Cremasco",
  description: "Il sito ufficiale del Carnevale Cremasco di Crema.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${unbounded.variable} ${inter.variable}`}>
      <body>
        <SkipLink targetId="contenuto" />
        <Header />
        <main id="contenuto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
