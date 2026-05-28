"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import Lotus from "@/components/icons/Lotus";

const values = [
  "Elegante",
  "Minimalista",
  "Sensorial",
  "Delicada",
  "Cálida",
  "Intencional",
];

export default function About() {
  return (
    <section id="quienes-somos" className="py-24 md:py-36 bg-warm-beige/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual side */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] bg-cream flex flex-col items-center justify-center gap-6">
              {/* Decorative borders */}
              <div className="absolute inset-6 border border-warm-beige pointer-events-none" />
              <div className="absolute inset-10 border border-soft-gold/30 pointer-events-none" />

              {/* Center content */}
              <Lotus className="w-24 h-24 md:w-32 md:h-32 text-soft-gold" />
              <div className="text-center px-8">
                <p className="font-serif text-2xl md:text-3xl text-dark italic leading-relaxed">
                  &ldquo;El arte de regalar<br />con intención&rdquo;
                </p>
                <div className="w-8 h-px bg-soft-gold mx-auto mt-4" />
              </div>

              {/* Decorative corner dots */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-soft-gold" />
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-soft-gold" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-soft-gold" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-soft-gold" />
            </div>
          </ScrollReveal>

          {/* Text side */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="right">
              <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-2">
                Nuestra Historia
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-dark leading-tight">
                Quiénes<br />Somos
              </h2>
              <div className="w-12 h-px bg-soft-gold mt-6" />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <p className="font-sans text-taupe leading-relaxed text-base">
                ELUNÈ nace para transformar momentos cotidianos en experiencias
                especiales. A través de detalles simples, estéticos y sensoriales,
                convertimos lo cotidiano en algo significativo.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <p className="font-sans text-taupe leading-relaxed text-base">
                Cada producto está diseñado para ser regalado, exhibido y
                recordado. Buscamos acompañar momentos, regalar emociones y
                elevar lo simple a algo memorable.
              </p>
            </ScrollReveal>

            {/* Brand values */}
            <ScrollReveal direction="right" delay={0.25}>
              <div className="flex flex-wrap gap-2 mt-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="font-sans text-xs tracking-[0.25em] uppercase text-taupe border border-warm-beige px-3 py-1.5 hover:border-soft-gold hover:text-soft-gold transition-colors duration-300"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <blockquote className="border-l-2 border-soft-gold pl-5 mt-2">
                <p className="font-serif text-lg text-dark italic leading-relaxed">
                  &ldquo;Creamos productos que no solo se utilicen, sino que se
                  sientan.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
