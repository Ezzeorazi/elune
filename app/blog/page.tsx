import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — ELUNÈ",
  description:
    "Ideas, inspiración y consejos sobre regalos, self-care y momentos especiales. El blog de ELUNÈ.",
};

const categories = ["Todos", "Regalos", "Self-Care", "Bienestar", "Eventos"];

export default function BlogPage() {
  const posts = getPosts().filter((p) => p.published);

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
            Ideas & Inspiración
          </span>
          <h1 className="font-serif text-6xl md:text-7xl text-dark mb-4">
            El Blog
          </h1>
          <p className="font-sans text-taupe text-base max-w-md mx-auto leading-relaxed">
            Inspiración, consejos y todo lo que necesitás para regalar con
            intención.
          </p>
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`font-sans text-xs tracking-[0.25em] uppercase px-4 py-1.5 border transition-colors duration-300 ${
                cat === "Todos"
                  ? "border-dark bg-dark text-cream"
                  : "border-warm-beige text-taupe hover:border-soft-gold hover:text-soft-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div
                className="aspect-3/2 mb-5 relative overflow-hidden"
                style={{ background: post.bg }}
              >
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-4xl text-dark/10 select-none tracking-widest">
                      ELUNÈ
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/5 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-taupe uppercase bg-cream/70 backdrop-blur-sm px-2 py-1">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-taupe/50">
                  <span className="font-sans text-xs">{post.date}</span>
                  <span>·</span>
                  <span className="font-sans text-xs">
                    {post.readTime} de lectura
                  </span>
                </div>
                <h2 className="font-serif text-xl text-dark group-hover:text-soft-gold transition-colors duration-300 leading-snug">
                  {post.title}
                </h2>
                <p className="font-sans text-sm text-taupe leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 font-sans text-xs tracking-widest text-soft-gold uppercase mt-1 group-hover:gap-3 transition-all duration-300">
                  Leer más <ArrowRight size={12} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
