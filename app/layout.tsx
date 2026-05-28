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

const BASE_URL = "https://madebyelune.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ELUNÈ — El arte de regalar con intención",
    template: "%s | ELUNÈ",
  },
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
    "madebyelune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "ELUNÈ — El arte de regalar con intención",
    description:
      "Jabones artesanales, boxes de regalo y souvenirs para eventos especiales.",
    url: BASE_URL,
    siteName: "ELUNÈ",
    images: [
      {
        url: "/image/packaging-elune-desde-arriba.webp",
        width: 1200,
        height: 630,
        alt: "ELUNÈ — El arte de regalar con intención",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELUNÈ — El arte de regalar con intención",
    description:
      "Jabones artesanales, boxes de regalo y souvenirs para momentos especiales.",
    images: ["/image/packaging-elune-desde-arriba.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  name: "ELUNÈ",
                  url: BASE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/logo-elune-principal.svg`,
                  },
                  image: `${BASE_URL}/image/packaging-elune-desde-arriba.webp`,
                  description:
                    "Jabones artesanales, boxes de regalo y souvenirs para momentos especiales.",
                  sameAs: ["https://instagram.com/madebyelune"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "ELUNÈ",
                  publisher: { "@id": `${BASE_URL}/#organization` },
                  inLanguage: "es-AR",
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
