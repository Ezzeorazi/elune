import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getPosts } from "@/lib/data";

export default function BlogPreview() {
  const posts = getPosts()
    .filter((p) => p.published)
    .slice(0, 3);

  return (
    <section id="blog" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div
                  className="aspect-3/2 mb-5 relative overflow-hidden"
                  style={{ background: post.bg }}
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-5xl text-white/20 select-none">
                        ELUNÈ
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-white/80 uppercase bg-dark/30 backdrop-blur-sm px-2 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-taupe/60">
                    <span className="font-sans text-xs">{post.date}</span>
                    <span className="text-xs">·</span>
                    <span className="font-sans text-xs">
                      {post.readTime} de lectura
                    </span>
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
