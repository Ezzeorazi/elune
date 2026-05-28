import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import BlogPreview from "@/components/sections/BlogPreview";
import Catalog from "@/components/sections/Catalog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <BlogPreview />
      <Catalog />
      <Contact />
    </>
  );
}
