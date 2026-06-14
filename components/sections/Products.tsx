import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProductGrid from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/data";

export default async function Products() {
  const products = (await getProducts()).filter((p) => p.published);
  const featured = products.slice(0, 4);

  return (
    <section id="productos" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase mb-4 block">
            Nuestras Creaciones
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-dark">
            Productos
          </h2>
          <p className="font-sans text-taupe text-base max-w-md mx-auto leading-relaxed mt-6">
            Una selección de nuestros souvenirs, jabones artesanales y detalles
            personalizados para bodas y eventos.
          </p>
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </ScrollReveal>

        <ProductGrid products={featured} />

        <ScrollReveal className="text-center mt-16" delay={0.2}>
          <Link
            href="/productos"
            className="inline-block font-sans text-sm tracking-[0.25em] uppercase text-taupe border border-taupe/40 px-8 py-3 hover:border-soft-gold hover:text-soft-gold transition-colors duration-300"
          >
            Ver todos los productos
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
