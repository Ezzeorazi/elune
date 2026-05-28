import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — ELUNÈ",
  description:
    "Ideas, inspiración y consejos sobre regalos, self-care y momentos especiales. El blog de ELUNÈ.",
};

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
  },
  {
    slug: "souvenirs-que-se-recuerdan",
    category: "Eventos",
    title: "Souvenirs que se recuerdan (y los que no)",
    excerpt:
      "La diferencia entre un souvenir olvidable y uno que se guarda para siempre está en el detalle. Te contamos el secreto.",
    date: "22 de marzo, 2025",
    readTime: "4 min",
    bg: "bg-[#f0f4ef]",
  },
  {
    slug: "como-armar-una-box-de-regalo-perfecta",
    category: "Regalos",
    title: "Cómo armar una box de regalo perfecta",
    excerpt:
      "Paso a paso, todos los elementos que hacen que una caja de regalo sea una experiencia completa y memorable.",
    date: "5 de marzo, 2025",
    readTime: "6 min",
    bg: "bg-[#f7f3ed]",
  },
  {
    slug: "ingredientes-naturales-en-jabones",
    category: "Self-Care",
    title: "Ingredientes naturales: por qué importan",
    excerpt:
      "Lavanda, avena, miel, arcilla: conocé los ingredientes que usamos y por qué marcan la diferencia en tu piel.",
    date: "18 de febrero, 2025",
    readTime: "5 min",
    bg: "bg-[#f0eef5]",
  },
];

const categories = ["Todos", "Regalos", "Self-Care", "Bienestar", "Eventos"];

export default function BlogPage() {
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
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              {/* Image */}
              <div className={`${post.bg} aspect-[3/2] mb-5 relative overflow-hidden flex items-center justify-center`}>
                <span className="font-serif text-4xl text-dark/10 select-none tracking-widest">
                  ELUNÈ
                </span>
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/5 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-taupe uppercase bg-cream/70 backdrop-blur-sm px-2 py-1">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-taupe/50">
                  <span className="font-sans text-xs">{post.date}</span>
                  <span>·</span>
                  <span className="font-sans text-xs">{post.readTime} de lectura</span>
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
