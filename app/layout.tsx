import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
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
    default: "ELUNÈ — Jabones Artesanales y Souvenirs para Bodas · Playa del Carmen",
    template: "%s | ELUNÈ",
  },
  description:
    "Jabones artesanales, souvenirs y welcome bags para bodas de destino en Playa del Carmen y la Riviera Maya. ELUNÈ crea detalles únicos, boxes de regalo y recuerdos personalizados para momentos especiales.",
  keywords: [
    "jabones artesanales playa del carmen",
    "souvenirs para boda riviera maya",
    "recuerdos para boda playa del carmen",
    "welcome bags boda riviera maya",
    "detalles para invitados boda",
    "cajas de regalo personalizadas playa del carmen",
    "wedding favors playa del carmen",
    "jabones artesanales",
    "boxes de regalo",
    "souvenirs personalizados",
    "ELUNÈ",
    "madebyelune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "ELUNÈ — Jabones Artesanales y Souvenirs para Bodas · Playa del Carmen",
    description:
      "Jabones artesanales, souvenirs y welcome bags para bodas en Playa del Carmen y la Riviera Maya. Detalles únicos y regalos personalizados.",
    url: BASE_URL,
    siteName: "ELUNÈ",
    images: [
      {
        url: "/image/packaging-elune-desde-arriba.webp",
        width: 1200,
        height: 630,
        alt: "ELUNÈ — Jabones artesanales y souvenirs para bodas en Playa del Carmen",
      },
    ],
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELUNÈ — Jabones Artesanales y Souvenirs para Bodas · Playa del Carmen",
    description:
      "Jabones artesanales, souvenirs y welcome bags para bodas de destino en Playa del Carmen y la Riviera Maya.",
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
      lang="es-MX"
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
                    "Jabones artesanales, souvenirs y welcome bags para bodas de destino en Playa del Carmen y la Riviera Maya.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Playa del Carmen",
                    addressRegion: "Quintana Roo",
                    addressCountry: "MX",
                  },
                  sameAs: ["https://instagram.com/madebyelune"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "ELUNÈ",
                  publisher: { "@id": `${BASE_URL}/#organization` },
                  inLanguage: "es-MX",
                },
              ],
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S3Z6MEET3Z"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S3Z6MEET3Z');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
