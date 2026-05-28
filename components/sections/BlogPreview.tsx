"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const posts = [
  {
    slug: "los-mejores-regalos-para-cada-ocasion",
    category: "Regalos",
    title: "Los mejores regalos para cada ocasión",
    excerpt:
      "Descubrí cómo elegir el regalo perfecto que transmita lo que querés decir, sin importar la ocasión ni el presupuesto.",
    date: "15 de mayo, 2025",
    readTime: "4 min",
    bg: "bg-[#f5ede8]",
    accent: "bg-[#e8d0c4]",
  },
  {
    slug: "como-elegir-el-jabon-artesanal-perfecto",
    category: "Self-Care",
    title: "Cómo elegir el jabón artesanal perfecto",
    excerpt:
      "Fragancia, ingredientes naturales y textura: todo lo que necesitás saber para encontrar tu jabón ideal.",
    date: "28 de abril, 2025",
    readTime: "5 min",
    bg: "bg-[#edf2ee]",
    accent: "bg-[#d4e4d6]",
  },
  {
    slug: "el-ritual-de-regalarse-a-una-misma",
    category: "Bienestar",
    title: "El ritual de regalarse a una misma",
    excerpt:
      "El autocuidado también es un arte. Aprendé a crear rituales simples que transformen tu rutina en algo especial.",
    date: "10 de abril, 2025",
    readTime: "3 min",
    bg: "bg-[#f3f0f7]",
    accent: "bg-[#ddd8ea]",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal>
            <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
              Ideas & Inspiración
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-dark">
              El Blog
            </h2>
            <div className="w-12 h-px bg-soft-gold mt-5" />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest text-taupe hover:text-soft-gold transition-colors duration-300 uppercase"
            >
              Ver todos
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {/* Card image area */}
                <div
                  className={`${post.bg} aspect-[3/2] mb-5 relative overflow-hidden`}
                >
                  <div
                    className={`${post.accent} absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-5xl text-white/20 select-none">
                      ELUNÈ
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-white/80 uppercase bg-dark/30 backdrop-blur-sm px-2 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-taupe/60">
                    <span className="font-sans text-xs">{post.date}</span>
                    <span className="text-xs">·</span>
                    <span className="font-sans text-xs">{post.readTime} de lectura</span>
                  </div>
                  <h3 className="font-serif text-xl text-dark group-hover:text-soft-gold transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm text-taupe leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs tracking-widest text-soft-gold uppercase mt-1 group-hover:gap-3 transition-all duration-300">
                    Leer más <ArrowRight size={12} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
