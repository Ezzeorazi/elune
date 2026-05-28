import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import BlogPreview from "@/components/sections/BlogPreview";
import InstagramFollow from "@/components/sections/InstagramFollow";
import Catalog from "@/components/sections/Catalog";
import Contact from "@/components/sections/Contact";
import { getSettings } from "@/lib/data";

export default function Home() {
  const settings = getSettings();

  return (
    <>
      <Hero />
      <Products />
      <About />
      <BlogPreview />
      <InstagramFollow settings={settings} />
      <Catalog whatsapp={settings.whatsapp} />
      <Contact
        instagram={settings.instagram}
        instagramUrl={settings.instagramUrl}
        whatsapp={settings.whatsapp}
        email={settings.email}
      />
    </>
  );
}
