"use client";

import { Sparkles, Gift, Star, Heart } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const products = [
  {
    id: 1,
    name: "Jabones Artesanales",
    description:
      "Elaborados a mano con ingredientes naturales. Cada jabón es único, pensado para ser usado y para ser regalado.",
    bg: "bg-[#f8ede8]",
    iconBg: "bg-[#f0d4cc]",
    Icon: Sparkles,
    href: "/#contacto",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Boxes de Regalo",
    description:
      "Cajas curadas con amor y detalle. Cada box es una experiencia completa, lista para sorprender en cualquier ocasión especial.",
    bg: "bg-[#edf2ed]",
    iconBg: "bg-[#d4e4d4]",
    Icon: Gift,
    href: "/#contacto",
    tag: "Más vendido",
  },
  {
    id: 3,
    name: "Souvenirs para Eventos",
    description:
      "El detalle perfecto para bodas, cumpleaños y celebraciones. Personalizados con el nombre o mensaje que elijas.",
    bg: "bg-[#f5f0e8]",
    iconBg: "bg-[#e8d9c0]",
    Icon: Star,
    href: "/#contacto",
    tag: "Personalizable",
  },
  {
    id: 4,
    name: "Detalles Personalizados",
    description:
      "Creaciones únicas adaptadas a tu historia. El regalo con intención que convierte un momento en recuerdo.",
    bg: "bg-[#f0eef5]",
    iconBg: "bg-[#dbd8ea]",
    Icon: Heart,
    href: "/#contacto",
    tag: "Exclusivo",
  },
];

export default function Products() {
  return (
    <section id="productos" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase mb-4 block">
            Nuestras Creaciones
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-dark">
            Productos
          </h2>
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </ScrollReveal>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <div className={`${product.bg} group relative flex flex-col h-full overflow-hidden`}>
                {/* Image area */}
                <div
                  className={`${product.iconBg} aspect-[4/5] flex flex-col items-center justify-center gap-4 transition-transform duration-700 group-hover:scale-[1.02]`}
                >
                  <product.Icon
                    size={36}
                    strokeWidth={1}
                    className="text-taupe"
                  />
                  <span className="font-serif text-xs tracking-[0.3em] text-taupe/60 uppercase">
                    ELUNÈ
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <span className="font-sans text-[10px] tracking-[0.35em] text-soft-gold uppercase">
                    {product.tag}
                  </span>
                  <h3 className="font-serif text-xl text-dark">
                    {product.name}
                  </h3>
                  <p className="font-sans text-sm text-taupe leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <Link
                    href={product.href}
                    className="inline-block mt-2 font-sans text-xs tracking-[0.25em] text-dark uppercase border-b border-dark/30 pb-0.5 hover:border-soft-gold hover:text-soft-gold transition-colors duration-300 self-start"
                  >
                    Consultar
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center mt-16" delay={0.2}>
          <Link
            href="/#catalogo"
            className="inline-block font-sans text-sm tracking-[0.25em] uppercase text-taupe border border-taupe/40 px-8 py-3 hover:border-soft-gold hover:text-soft-gold transition-colors duration-300"
          >
            Ver catálogo completo
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
