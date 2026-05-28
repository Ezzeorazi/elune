import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/lib/data";

export async function generateStaticParams() {
  return getPosts()
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog ELUNÈ`,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="font-serif text-3xl text-dark mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.match(/^\*\*(.+?)\*\*:(.*)/)) {
      const match = line.match(/^\*\*(.+?)\*\*:(.*)/);
      if (match) {
        return (
          <p key={i} className="font-sans text-taupe leading-relaxed mt-2">
            <strong className="text-dark">{match[1]}:</strong>
            {match[2]}
          </p>
        );
      }
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className="font-sans font-semibold text-dark mt-4">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (line.match(/^\d+\.\s/)) {
      return (
        <li
          key={i}
          className="font-sans text-taupe leading-relaxed ml-4 list-decimal"
        >
          {line.replace(/^\d+\.\s/, "")}
        </li>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="font-sans text-taupe leading-relaxed ml-4 list-disc">
          {line.replace(/^- /, "")}
        </li>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-3" />;
    return (
      <p key={i} className="font-sans text-taupe leading-relaxed">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || !post.published) notFound();

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest text-taupe hover:text-soft-gold transition-colors duration-300 uppercase mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver al blog
        </Link>

        {/* Hero image area */}
        <div
          className="aspect-16/7 w-full relative overflow-hidden mb-10"
          style={{ background: post.bg }}
        >
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl text-dark/10 tracking-widest select-none">
                ELUNÈ
              </span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans text-[10px] tracking-[0.3em] text-soft-gold uppercase border border-soft-gold px-2 py-0.5">
            {post.category}
          </span>
          <span className="font-sans text-xs text-taupe/60">{post.date}</span>
          <span className="text-taupe/30">·</span>
          <span className="font-sans text-xs text-taupe/60">
            {post.readTime} de lectura
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight mb-6">
          {post.title}
        </h1>
        <div className="w-12 h-px bg-soft-gold mb-10" />

        <div className="flex flex-col gap-3">{renderContent(post.content)}</div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-warm-beige/30 text-center">
          <p className="font-serif text-xl text-dark italic mb-4">
            &ldquo;El arte de regalar con intención&rdquo;
          </p>
          <Link
            href="/#contacto"
            className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-cream bg-dark px-6 py-3 hover:bg-soft-gold transition-colors duration-500"
          >
            Hacer un pedido
          </Link>
        </div>
      </article>
    </div>
  );
}
