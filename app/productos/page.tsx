import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/data";

const BASE_URL = "https://madebyelune.com";

export const metadata: Metadata = {
  title: "Souvenirs y Jabones Artesanales para Bodas en Playa del Carmen",
  description:
    "Catálogo de souvenirs, welcome bags, jabones artesanales y detalles personalizados para bodas y eventos en Playa del Carmen y la Riviera Maya. Hechos a mano y personalizables con el nombre y la fecha de los novios.",
  alternates: { canonical: "/productos" },
  openGraph: {
    title: "Souvenirs y Jabones Artesanales para Bodas · ELUNÈ",
    description:
      "Souvenirs, welcome bags, jabones artesanales y detalles personalizados para bodas y eventos en Playa del Carmen y la Riviera Maya.",
    type: "website",
    url: "/productos",
    siteName: "ELUNÈ",
    locale: "es_MX",
  },
};

export default async function ProductosPage() {
  const products = (await getProducts()).filter((p) => p.published);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${BASE_URL}/productos` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/producto/${product.id}`,
      name: product.name,
    })),
  };

  return (
    <main className="min-h-screen bg-cream pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] text-taupe/70 uppercase">
            <li>
              <Link href="/" className="hover:text-dark transition-colors duration-200">
                Inicio
              </Link>
            </li>
            <li aria-hidden className="text-taupe/30">/</li>
            <li className="text-dark" aria-current="page">Productos</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
            Nuestras Creaciones
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-dark leading-tight">
            Souvenirs y Detalles<br />para Bodas
          </h1>
          <div className="w-16 h-px bg-soft-gold mx-auto my-7" />
          <p className="font-sans text-taupe text-base max-w-2xl mx-auto leading-relaxed">
            Cada pieza de ELUNÈ está hecha a mano y pensada para regalarse,
            exhibirse y recordarse. Souvenirs, welcome bags, jabones artesanales,
            boxes de autocuidado y detalles personalizables con el aroma, el color
            y el nombre de los novios — para bodas de destino y eventos en{" "}
            <strong className="text-dark font-medium">Playa del Carmen, Cancún, Tulum y toda la Riviera Maya</strong>.
            Entrega local, sin aduanas ni esperas.
          </p>
        </div>

        <ProductGrid products={products} />

        {/* CTA */}
        <div className="mt-20 p-10 bg-warm-beige/30 text-center">
          <p className="font-serif text-2xl text-dark italic mb-3">
            ¿Buscas algo personalizado para tu evento?
          </p>
          <p className="font-sans text-taupe text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Personalizamos aromas, colores, empaque y la cantidad que necesites.
            Cuéntanos sobre tu boda o celebración y te armamos una propuesta a medida.
          </p>
          <Link
            href="/#contacto"
            className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-cream bg-dark px-8 py-3 hover:bg-soft-gold transition-colors duration-500"
          >
            Pedir una propuesta
          </Link>
        </div>
      </div>
    </main>
  );
}
