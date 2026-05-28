"use client";

import { useState, useEffect } from "react";
import type { Settings } from "@/lib/types";

const ic =
  "w-full border border-[#DDD2C4] bg-white px-3 py-2.5 text-sm text-[#2C2825] focus:outline-none focus:border-[#C7AA7A] transition-colors duration-200";
const lc =
  "text-[10px] tracking-[0.25em] text-[#6F6963] uppercase block mb-1.5";
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  if (!form)
    return (
      <div className="p-8 text-sm text-[#6F6963]" style={sans}>
        Cargando...
      </div>
    );

  const set = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => (p ? { ...p, [name]: value } : p));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-3xl text-[#2C2825]" style={serif}>
          Configuración
        </h1>
        <p className="text-sm text-[#6F6963] mt-1" style={sans}>
          Datos globales del sitio. Si una red social queda vacía, no aparece en el footer.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-8">
        {/* Contacto */}
        <section>
          <p
            className="text-xs tracking-[0.3em] text-[#C7AA7A] uppercase mb-4 pb-2 border-b border-[#DDD2C4]"
            style={sans}
          >
            Contacto
          </p>
          <div className="space-y-4">
            <div>
              <label className={lc} style={sans}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={set}
                className={ic}
                style={sans}
              />
            </div>
            <div>
              <label className={lc} style={sans}>
                WhatsApp (solo números, con código de país)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={set}
                placeholder="5491112345678"
                className={ic}
                style={sans}
              />
              <p className="text-[11px] text-[#6F6963]/50 mt-1" style={sans}>
                Enlace: wa.me/{form.whatsapp || "..."}
              </p>
            </div>
            <div>
              <label className={lc} style={sans}>
                Teléfono (opcional)
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={set}
                className={ic}
                style={sans}
              />
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section>
          <p
            className="text-xs tracking-[0.3em] text-[#C7AA7A] uppercase mb-4 pb-2 border-b border-[#DDD2C4]"
            style={sans}
          >
            Instagram
          </p>
          <div className="space-y-4">
            <div>
              <label className={lc} style={sans}>
                Handle (con @)
              </label>
              <input
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={set}
                placeholder="@madebyelune"
                className={ic}
                style={sans}
              />
            </div>
            <div>
              <label className={lc} style={sans}>
                URL completa
              </label>
              <input
                type="text"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={set}
                placeholder="https://instagram.com/madebyelune"
                className={ic}
                style={sans}
              />
            </div>
          </div>
        </section>

        {/* Facebook (opcional) */}
        <section>
          <p
            className="text-xs tracking-[0.3em] text-[#C7AA7A] uppercase mb-1 pb-2 border-b border-[#DDD2C4]"
            style={sans}
          >
            Facebook{" "}
            <span className="normal-case tracking-normal text-[#6F6963]/50">
              (opcional — si está vacío no aparece)
            </span>
          </p>
          <div className="space-y-4 mt-4">
            <div>
              <label className={lc} style={sans}>
                Handle o nombre de página
              </label>
              <input
                type="text"
                name="facebook"
                value={form.facebook}
                onChange={set}
                placeholder="elune.oficial"
                className={ic}
                style={sans}
              />
            </div>
            <div>
              <label className={lc} style={sans}>
                URL completa
              </label>
              <input
                type="text"
                name="facebookUrl"
                value={form.facebookUrl}
                onChange={set}
                placeholder="https://facebook.com/elune.oficial"
                className={ic}
                style={sans}
              />
            </div>
          </div>
        </section>

        {/* TikTok (opcional) */}
        <section>
          <p
            className="text-xs tracking-[0.3em] text-[#C7AA7A] uppercase mb-1 pb-2 border-b border-[#DDD2C4]"
            style={sans}
          >
            TikTok{" "}
            <span className="normal-case tracking-normal text-[#6F6963]/50">
              (opcional — si está vacío no aparece)
            </span>
          </p>
          <div className="space-y-4 mt-4">
            <div>
              <label className={lc} style={sans}>
                Handle (con @)
              </label>
              <input
                type="text"
                name="tiktok"
                value={form.tiktok}
                onChange={set}
                placeholder="@madebyelune"
                className={ic}
                style={sans}
              />
            </div>
            <div>
              <label className={lc} style={sans}>
                URL completa
              </label>
              <input
                type="text"
                name="tiktokUrl"
                value={form.tiktokUrl}
                onChange={set}
                placeholder="https://tiktok.com/@madebyelune"
                className={ic}
                style={sans}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#2C2825] text-[#F5F1EB] text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#C7AA7A] transition-colors duration-300 disabled:opacity-50"
            style={sans}
          >
            {saving ? "Guardando..." : "Guardar configuración"}
          </button>
          {saved && (
            <span className="text-sm text-green-600" style={sans}>
              ✓ Guardado
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
