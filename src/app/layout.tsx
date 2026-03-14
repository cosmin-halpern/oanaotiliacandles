import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Oana Otilia Candles — Lumânări Artizanale",
    template: "%s | Oana Otilia Candles",
  },
  description:
    "Lumânări artizanale handmade, create cu dragoste din ingrediente naturale. Arome unice pentru casa ta.",
  keywords: ["lumânări", "artizanal", "handmade", "candles", "aromaterapie", "România"],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Oana Otilia Candles",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}