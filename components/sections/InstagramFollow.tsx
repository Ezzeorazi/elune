import Image from "next/image";
import type { Settings } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const gridImages = [
  { src: "/image/jabon-de-flor.webp", alt: "Jabón de flor ELUNÈ" },
  { src: "/image/jabon-de-corazones.webp", alt: "Jabones de corazones ELUNÈ" },
  { src: "/image/packaging-elune-desde-arriba.webp", alt: "Packaging ELUNÈ desde arriba" },
  { src: "/image/jabones-en-bolsas.webp", alt: "Jabones en bolsas ELUNÈ" },
  { src: "/image/packaging-elune-de-cerca.webp", alt: "Packaging ELUNÈ de cerca" },
  { src: "/image/muchas-bolsas-de-jabones.webp", alt: "Bolsas de jabones ELUNÈ" },
];

export default function InstagramFollow({
  settings,
}: {
  settings: Settings;
}) {
  const url = settings.instagramUrl || "https://instagram.com/madebyelune";
  const handle = settings.instagram || "@madebyelune";

  return (
    <section className="py-24 md:py-36 bg-warm-beige/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
            Seguinos
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-4">
            Instagram
          </h2>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-serif text-2xl text-taupe hover:text-soft-gold transition-colors duration-300 italic"
          >
            <InstagramIcon size={22} />
            {handle}
          </a>
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </ScrollReveal>

        {/* Image grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-12">
            {gridImages.map((img, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-warm-beige"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500 flex items-center justify-center">
                  <InstagramIcon size={20} />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="text-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-sans text-sm tracking-[0.25em] uppercase text-dark border border-dark px-8 py-3.5 hover:bg-dark hover:text-cream transition-all duration-500"
          >
            <InstagramIcon size={14} />
            Seguir en Instagram
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
