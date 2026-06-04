"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || testimonials.length <= 1) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 300);
    },
    [animating, testimonials.length]
  );

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = useCallback(
    () => goTo((current + 1) % testimonials.length),
    [current, goTo, testimonials.length]
  );

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <p className="font-sans text-sm text-taupe/60 text-center py-12">
        Todavía no hay testimonios publicados.
      </p>
    );
  }

  const t = testimonials[current];

  return (
    <div className="relative">
      <div
        className="transition-opacity duration-300"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
          {t.photo ? (
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-soft-gold/30 ring-offset-2 ring-offset-cream shrink-0">
              <Image
                src={t.photo}
                alt={t.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-warm-beige flex items-center justify-center shrink-0">
              <span className="font-serif text-2xl text-soft-gold select-none">
                {t.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <Quote
            size={28}
            strokeWidth={1}
            className="text-soft-gold/40 -mb-4"
          />

          <blockquote className="font-serif text-xl md:text-2xl text-dark leading-relaxed italic">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-sm font-medium text-dark tracking-wide">
              {t.name}
            </span>
            {t.location && (
              <span className="font-sans text-xs text-taupe/60 tracking-[0.2em] uppercase">
                {t.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 p-2 text-taupe/40 hover:text-soft-gold transition-colors duration-300"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 p-2 text-taupe/40 hover:text-soft-gold transition-colors duration-300"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>

          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-soft-gold w-4" : "bg-warm-beige"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
