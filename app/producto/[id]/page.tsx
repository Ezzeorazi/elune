import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/data";
import ProductCustomizer from "@/components/producto/ProductCustomizer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};
  return {
    title: `${product.name} — ELUNÈ`,
    description: product.description,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product || !product.published) notFound();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <main className="min-h-screen bg-cream">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <Link
          href="/#productos"
          className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.25em] text-taupe uppercase hover:text-dark transition-colors duration-200"
        >
          <ArrowLeft size={13} /> Volver
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Image ── */}
          <div
            className="aspect-4/5 relative overflow-hidden w-full"
            style={{ background: product.bg }}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-sm tracking-[0.3em] text-taupe/40 uppercase">
                  ELUNÈ
                </span>
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col gap-8 lg:pt-4">
            {/* Header */}
            <div className="space-y-3">
              {product.tag && (
                <span className="font-sans text-[10px] tracking-[0.4em] text-soft-gold uppercase">
                  {product.tag}
                </span>
              )}
              <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight">
                {product.name}
              </h1>
              {product.price && (
                <p className="font-sans text-lg text-dark">
                  ${product.price}{" "}
                  <span className="text-sm text-taupe">MXN</span>
                </p>
              )}
              <div className="w-12 h-px bg-soft-gold" />
              <p className="font-sans text-sm text-taupe leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Includes */}
            {product.includes && product.includes.length > 0 && (
              <div>
                <h2 className="font-sans text-[10px] tracking-[0.35em] text-taupe uppercase mb-3">
                  Incluye
                </h2>
                <ul className="space-y-1.5">
                  {product.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-sans text-sm text-dark"
                    >
                      <span className="text-soft-gold mt-0.5 shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Options + WhatsApp button */}
            <ProductCustomizer product={product} whatsappNumber={whatsappNumber} />

            {/* Artisanal note */}
            {product.artisanalNote && (
              <div className="border-t border-warm-beige pt-6">
                <p className="font-sans text-xs text-taupe/80 leading-relaxed italic">
                  {product.artisanalNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
