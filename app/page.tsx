import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import BlogPreview from "@/components/sections/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFollow from "@/components/sections/InstagramFollow";
import WhatsappCTA from "@/components/sections/WhatsappCTA";
import Contact from "@/components/sections/Contact";
import { getSettings } from "@/lib/data";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Hero />
      <Products />
      <About />
      <BlogPreview />
      <Testimonials />
      <InstagramFollow settings={settings} />
      <WhatsappCTA whatsapp={settings.whatsapp} />
      <Contact
        instagram={settings.instagram}
        instagramUrl={settings.instagramUrl}
        whatsapp={settings.whatsapp}
        email={settings.email}
      />
    </>
  );
}
