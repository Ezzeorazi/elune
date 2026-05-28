"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface ContactProps {
  instagram: string;
  instagramUrl: string;
  whatsapp: string;
  email: string;
}

export default function Contact({
  instagram,
  instagramUrl,
  whatsapp,
  email,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto" className="py-24 md:py-36 bg-warm-beige/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info side */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <span className="font-sans text-xs tracking-[0.4em] text-soft-gold uppercase block mb-3">
                Hablemos
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-dark leading-tight">
                Contacto
              </h2>
              <div className="w-12 h-px bg-soft-gold mt-6" />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-sans text-taupe leading-relaxed">
                ¿Tenés una celebración especial? ¿Querés personalizar un
                regalo? Escribinos y con gusto armamos algo único para vos.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-5 mt-2">
                {instagramUrl && (
                  <div>
                    <p className="font-sans text-xs tracking-[0.3em] text-soft-gold uppercase mb-1">
                      Instagram
                    </p>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-serif text-xl text-dark hover:text-soft-gold transition-colors duration-300"
                    >
                      <InstagramIcon size={18} />
                      {instagram}
                    </a>
                  </div>
                )}

                {whatsapp && (
                  <div>
                    <p className="font-sans text-xs tracking-[0.3em] text-soft-gold uppercase mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl text-dark hover:text-soft-gold transition-colors duration-300"
                    >
                      Enviar mensaje
                    </a>
                  </div>
                )}

                {email && (
                  <div>
                    <p className="font-sans text-xs tracking-[0.3em] text-soft-gold uppercase mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="font-serif text-xl text-dark hover:text-soft-gold transition-colors duration-300"
                    >
                      {email}
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <blockquote className="border-l-2 border-soft-gold pl-5 mt-6">
                <p className="font-serif text-lg italic text-taupe leading-relaxed">
                  &ldquo;Cada pedido es una historia. Contanos la tuya.&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Form side */}
          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
                >
                  Motivo
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors duration-300 appearance-none"
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="jabones">Jabones artesanales</option>
                  <option value="box">Box de regalo</option>
                  <option value="souvenirs">Souvenirs para evento</option>
                  <option value="personalizado">Pedido personalizado</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300 resize-none"
                  placeholder="Contanos qué tenés en mente..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 bg-dark text-cream font-sans text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-soft-gold transition-colors duration-500 self-start"
              >
                <Send size={14} strokeWidth={2} />
                Enviar mensaje
              </button>

              {sent && (
                <p className="font-sans text-sm text-sage tracking-wide">
                  ¡Mensaje enviado! Te respondemos a la brevedad.
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
