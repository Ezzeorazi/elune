import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import { getPublishedTestimonials } from "@/lib/data";

export default async function Testimonials() {
  let testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>> = [];
  try {
    testimonials = await getPublishedTestimonials();
  } catch {
    // Silently fail — section renders empty state
  }

  return (
    <section id="testimonios" className="py-24 md:py-36 bg-warm-beige/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal>
            <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
              Lo que dicen nuestras clientas
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-dark">
              Testimonios
            </h2>
            <div className="w-12 h-px bg-soft-gold mt-5" />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              href="/testimonios"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest text-taupe hover:text-soft-gold transition-colors duration-300 uppercase"
            >
              Comparte el tuyo
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="px-8 md:px-16">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
