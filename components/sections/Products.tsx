import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getProducts } from "@/lib/data";

export default async function Products() {
  const products = (await getProducts()).filter((p) => p.published);

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
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <div
                className="group relative flex flex-col h-full overflow-hidden"
                style={{ background: product.bg }}
              >
                {/* Image area */}
                <div className="aspect-4/5 relative overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-xs tracking-[0.3em] text-taupe/40 uppercase">
                        ELUNÈ
                      </span>
                    </div>
                  )}
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
