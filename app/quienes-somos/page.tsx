import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://madebyelune.com";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Conoce la historia de ELUNÈ: jabones artesanales, souvenirs y detalles personalizados hechos a mano en la Riviera Maya. El arte de regalar con intención para bodas y eventos en Playa del Carmen.",
  alternates: { canonical: "/quienes-somos" },
  openGraph: {
    title: "Quiénes Somos · ELUNÈ",
    description:
      "La historia de ELUNÈ: detalles artesanales y personalizados, hechos a mano en la Riviera Maya. El arte de regalar con intención.",
    type: "website",
    url: "/quienes-somos",
    siteName: "ELUNÈ",
    locale: "es_MX",
  },
};

const values = [
  "Elegante",
  "Minimalista",
  "Sensorial",
  "Delicada",
  "Cálida",
  "Intencional",
];

const differentiators = [
  {
    title: "Hecho a mano y personalizable",
    text: "Cada pieza se elabora artesanalmente y se personaliza en aroma, color y con el nombre y la fecha de los novios.",
  },
  {
    title: "Local en la Riviera Maya",
    text: "Producimos y entregamos en Playa del Carmen, Cancún y Tulum: sin aduanas, sin esperas y con armado de welcome bags en el destino.",
  },
  {
    title: "Estética de marca cuidada",
    text: "Un empaque y una identidad pensados para regalarse y exhibirse, muy por encima de un souvenir genérico.",
  },
  {
    title: "Para cada celebración",
    text: "Bodas, quinceañeras, baby showers, Día de la Madre y detalles corporativos: acompañamos los momentos importantes todo el año.",
  },
];

export default function QuienesSomosPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Quiénes Somos", item: `${BASE_URL}/quienes-somos` },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Quiénes Somos — ELUNÈ",
    url: `${BASE_URL}/quienes-somos`,
    about: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <main className="min-h-screen bg-cream pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        {/* Breadcrumb */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] text-taupe/70 uppercase">
            <li>
              <Link href="/" className="hover:text-dark transition-colors duration-200">
                Inicio
              </Link>
            </li>
            <li aria-hidden className="text-taupe/30">/</li>
            <li className="text-dark" aria-current="page">Quiénes Somos</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-14">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
            Nuestra Historia
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-dark leading-tight">
            Quiénes Somos
          </h1>
          <div className="w-12 h-px bg-soft-gold mx-auto mt-6" />
        </header>

        {/* Story */}
        <div className="space-y-6 font-sans text-taupe leading-relaxed text-base">
          <p>
            ELUNÈ nace para transformar momentos cotidianos en experiencias
            especiales. A través de detalles simples, estéticos y sensoriales,
            convertimos lo cotidiano en algo significativo.
          </p>
          <p>
            Creamos jabones artesanales, souvenirs, welcome bags y boxes de
            regalo pensados para bodas de destino y eventos en Playa del Carmen y
            la Riviera Maya. Cada producto está diseñado para ser regalado,
            exhibido y recordado: buscamos acompañar momentos, regalar emociones y
            elevar lo simple a algo memorable.
          </p>
          <p>
            Trabajamos a mano, en cantidades cuidadas, y personalizamos cada
            detalle según la celebración. Porque un buen recuerdo no se tira: se
            guarda, se usa y trae de vuelta el momento.
          </p>
        </div>

        <blockquote className="border-l-2 border-soft-gold pl-5 my-12">
          <p className="font-serif text-2xl text-dark italic leading-relaxed">
            &ldquo;El arte de regalar con intención.&rdquo;
          </p>
        </blockquote>

        {/* Values */}
        <h2 className="font-serif text-3xl text-dark mb-5">Nuestra esencia</h2>
        <div className="flex flex-wrap gap-2 mb-14">
          {values.map((value) => (
            <span
              key={value}
              className="font-sans text-xs tracking-[0.25em] uppercase text-taupe border border-warm-beige px-3 py-1.5"
            >
              {value}
            </span>
          ))}
        </div>

        {/* Differentiators */}
        <h2 className="font-serif text-3xl text-dark mb-7">Lo que nos hace distintas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {differentiators.map((d) => (
            <div key={d.title} className="border-t border-warm-beige pt-4">
              <h3 className="font-serif text-xl text-dark mb-2">{d.title}</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 bg-warm-beige/30 text-center">
          <p className="font-serif text-xl text-dark italic mb-4">
            ¿Listas para crear el detalle perfecto?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/productos"
              className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-cream bg-dark px-6 py-3 hover:bg-soft-gold transition-colors duration-500"
            >
              Ver productos
            </Link>
            <Link
              href="/#contacto"
              className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-dark border border-taupe/40 px-6 py-3 hover:border-soft-gold hover:text-soft-gold transition-colors duration-300"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
