import type { Metadata } from "next";
import type { Components } from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/lib/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return (await getPosts())
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

const BASE_URL = "https://madebyelune.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const description = post.excerpt || post.content.slice(0, 160);
  return {
    title: `${post.title} — Blog`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      siteName: "ELUNÈ",
      locale: "es_MX",
      ...(post.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.image && { images: [post.image] }),
    },
  };
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl text-dark mt-12 mb-5 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-3xl text-dark mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-2xl text-dark mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-sans font-semibold text-lg text-dark mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="font-sans text-taupe leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-dark">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-taupe">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-1.5 mb-4 font-sans text-taupe">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-6 space-y-1.5 mb-4 font-sans text-taupe">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-soft-gold pl-5 my-6 font-serif text-xl text-taupe/80 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-soft-gold underline underline-offset-2 hover:text-dark transition-colors duration-200" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-soft-gold/30 my-10" />
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-warm-beige/50 text-dark px-1.5 py-0.5 rounded">{children}</code>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    author: {
      "@type": "Organization",
      name: "ELUNÈ",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ELUNÈ",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-elune-principal.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    ...(post.image && { image: `${BASE_URL}${post.image}` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

        <div className="prose-elune">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </div>

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
    </>
  );
}
