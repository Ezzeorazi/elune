import { Download, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Catalog({ whatsapp }: { whatsapp: string }) {
  const waUrl = `https://wa.me/${whatsapp}?text=Hola%20ELUN%C3%88%2C%20me%20gustar%C3%ADa%20recibir%20el%20cat%C3%A1logo`;

  return (
    <section
      id="catalogo"
      className="py-24 md:py-36 bg-dark text-cream relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-soft-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sage/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <ScrollReveal>
          <img src="/isotipo-elune-flor-loto.svg" alt="" className="h-10 w-auto mx-auto mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-4">
            Catálogo Completo
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            Descubre nuestra
            <br />
            colección completa
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-sans text-cream/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Todos nuestros productos, variantes, precios y opciones de
            personalización. Descárgalo o pídenos que te lo enviemos por
            WhatsApp.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/catalogo-elune.pdf"
              download
              className="inline-flex items-center gap-2.5 bg-soft-gold text-dark font-sans text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-cream transition-colors duration-500"
            >
              <Download size={16} strokeWidth={2} />
              Descargar catálogo
            </a>
            {whatsapp && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-cream/30 text-cream font-sans text-sm tracking-[0.2em] uppercase px-8 py-4 hover:border-soft-gold hover:text-soft-gold transition-colors duration-500"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Pedir por WhatsApp
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-20 border-t border-cream/10 pt-12">
            {[
              { value: "100%", label: "Hecho a mano" },
              { value: "✦", label: "" },
              { value: "Personalizable", label: "En cada detalle" },
              { value: "✦", label: "" },
              { value: "Envíos", label: "Riviera Maya · México" },
            ].map((item, i) =>
              item.value === "✦" ? (
                <span key={i} className="text-soft-gold/40 hidden sm:block">
                  {item.value}
                </span>
              ) : (
                <div key={i} className="text-center">
                  <p className="font-serif text-2xl text-cream mb-1">
                    {item.value}
                  </p>
                  <p className="font-sans text-xs tracking-widest text-cream/40 uppercase">
                    {item.label}
                  </p>
                </div>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
