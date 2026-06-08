import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import BlogFilter from "@/components/blog/BlogFilter";

export const metadata: Metadata = {
  title: "Blog — ELUNÈ",
  description:
    "Ideas, inspiración y consejos sobre regalos, self-care y momentos especiales. El blog de ELUNÈ.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = (await getPosts()).filter((p) => p.published);

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
            Inspiración, consejos y todo lo que necesitas para regalar con
            intención.
          </p>
          <div className="w-16 h-px bg-soft-gold mx-auto mt-6" />
        </div>

        <BlogFilter posts={posts} />
      </div>
    </div>
  );
}
