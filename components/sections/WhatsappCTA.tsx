import { MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhatsappCTA({ whatsapp }: { whatsapp: string }) {
  const waUrl = `https://wa.me/${whatsapp}?text=Hola%20ELUN%C3%88%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20personalizado`;

  return (
    <section
      id="personaliza"
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
            Pedidos Personalizados
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            Creemos juntas
            <br />
            tu detalle perfecto
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-sans text-cream/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Personalizamos aromas, colores, empaque y cantidades para tu boda o
            evento. Escríbenos por WhatsApp y te armamos una propuesta a medida,
            con precios y tiempos de entrega.
          </p>
        </ScrollReveal>

        {whatsapp && (
          <ScrollReveal delay={0.4}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-soft-gold text-dark font-sans text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-cream transition-colors duration-500"
            >
              <MessageCircle size={16} strokeWidth={2} />
              Escríbenos por WhatsApp
            </a>
          </ScrollReveal>
        )}

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
