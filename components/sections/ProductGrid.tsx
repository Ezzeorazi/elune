import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, i) => {
        const cta = product.options?.length ? "Personalizar" : "Ver producto";
        return (
          <ScrollReveal key={product.id} delay={i * 0.1}>
            <Link
              href={`/producto/${product.id}`}
              aria-label={`${cta}: ${product.name}`}
              className="group relative flex flex-col h-full overflow-hidden rounded-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(44,40,37,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              style={{ background: product.bg }}
            >
              {/* Image area */}
              <div className="aspect-4/5 relative overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-xs tracking-[0.3em] text-taupe/40 uppercase">
                      ELUNÈ
                    </span>
                  </div>
                )}

                {/* Hover overlay with clear affordance */}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-500 flex items-end justify-center pb-6">
                  <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-cream bg-dark/70 backdrop-blur-sm px-5 py-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    {cta}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <span className="font-sans text-[10px] tracking-[0.35em] text-soft-gold uppercase">
                  {product.tag}
                </span>
                <h3 className="font-serif text-xl text-dark group-hover:text-soft-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-taupe leading-relaxed flex-1">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-2 mt-2 font-sans text-xs tracking-[0.25em] text-dark uppercase self-start">
                  {cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-soft-gold">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
