import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import TestimonialForm from "@/components/sections/TestimonialForm";
import { getPublishedTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Lee lo que dicen nuestras clientas y comparte tu propia experiencia con los jabones artesanales ELUNÈ.",
  alternates: { canonical: "/testimonios" },
};

export default async function TestimoniosPage() {
  let testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>> = [];
  try {
    testimonials = await getPublishedTestimonials();
  } catch {
    // Render with empty state
  }

  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
              Lo que dicen nuestras clientas
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-dark">
              Testimonios
            </h1>
            <div className="w-12 h-px bg-soft-gold mt-5 mx-auto" />
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={0.1}>
          <div className="px-8 md:px-20 mb-28">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-warm-beige" />
          <span className="font-sans text-xs tracking-[0.4em] text-taupe/40 uppercase shrink-0">
            Comparte tu experiencia
          </span>
          <div className="flex-1 h-px bg-warm-beige" />
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase">
                Tu historia importa
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-dark leading-tight">
                ¿Tuviste una experiencia con ELUNÈ?
              </h2>
              <div className="w-8 h-px bg-soft-gold" />
              <p className="font-sans text-taupe leading-relaxed">
                Nos encanta saber cómo nuestros jabones artesanales llegaron a tu
                vida. Cada historia es un regalo para nosotras. Si tuviste una
                boda, un evento especial, o simplemente disfrutaste un producto,
                cuéntanoslo.
              </p>
              <blockquote className="border-l-2 border-soft-gold pl-5 mt-2">
                <p className="font-serif text-lg italic text-taupe leading-relaxed">
                  &ldquo;Cada testimonio es la razón por la que hacemos lo que hacemos.&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <TestimonialForm />
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
