import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELUNÈ — El arte de regalar con intención",
  description:
    "Jabones artesanales, boxes de regalo y souvenirs para eventos. ELUNÈ crea experiencias, detalles y momentos que se sienten.",
  keywords: [
    "jabones artesanales",
    "boxes de regalo",
    "souvenirs personalizados",
    "regalos con intención",
    "ELUNÈ",
    "regalos especiales",
    "jabones handmade",
  ],
  openGraph: {
    title: "ELUNÈ — El arte de regalar con intención",
    description:
      "Jabones artesanales, boxes de regalo y souvenirs para eventos especiales.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="bg-cream text-dark antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
