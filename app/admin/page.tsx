export const dynamic = "force-dynamic";

import Link from "next/link";
import { getProducts, getPosts, getSettings, getContacts } from "@/lib/data";
import { Package, FileText, ArrowRight, Settings, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const results = await Promise.allSettled([
    getProducts(),
    getPosts(),
    getSettings(),
    getContacts(),
  ]);

  const errors = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason?.message ?? String((r as PromiseRejectedResult).reason));

  const products = results[0].status === "fulfilled" ? results[0].value : [];
  const posts = results[1].status === "fulfilled" ? results[1].value : [];
  const settings = results[2].status === "fulfilled" ? results[2].value : null;
  const contacts = results[3].status === "fulfilled" ? results[3].value : [];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1
          className="text-3xl text-dark"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Dashboard
        </h1>
        <p
          className="text-sm text-taupe mt-1"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          Bienvenida al panel de ELUNÈ
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Productos",
            value: products.filter((p) => p.published).length,
            total: products.length,
            href: "/admin/products",
            icon: Package,
            sub: "publicados",
          },
          {
            label: "Artículos",
            value: posts.filter((p) => p.published).length,
            total: posts.length,
            href: "/admin/posts",
            icon: FileText,
            sub: "publicados",
          },
          {
            label: "Mensajes",
            value: contacts.filter((c) => !c.read).length,
            total: contacts.length,
            href: "/admin/contacts",
            icon: MessageSquare,
            sub: "sin leer",
          },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-warm-beige p-6 hover:border-soft-gold transition-colors duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <p
                className="text-xs tracking-[0.25em] text-taupe uppercase"
                style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
              >
                {card.label}
              </p>
              <card.icon size={18} className="text-soft-gold" strokeWidth={1} />
            </div>
            <p
              className="text-5xl text-dark mb-1"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {card.value}
            </p>
            <p
              className="text-xs text-taupe/60"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              {card.sub} (de {card.total})
            </p>
            <div
              className="flex items-center gap-1 mt-4 text-xs text-taupe group-hover:text-soft-gold transition-colors duration-200"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Ver todos <ArrowRight size={11} />
            </div>
          </Link>
        ))}
      </div>

      {errors.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 p-4 text-xs font-mono text-red-700 space-y-1">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      {/* Settings preview */}
      <div className="bg-white border border-warm-beige p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Settings size={15} className="text-soft-gold" strokeWidth={1.5} />
            <p
              className="text-xs tracking-[0.25em] text-taupe uppercase"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Configuración global
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs text-soft-gold hover:text-dark transition-colors duration-200"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Editar →
          </Link>
        </div>
        {settings ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Instagram", value: settings.instagram || "—" },
              { label: "WhatsApp", value: settings.whatsapp || "—" },
              { label: "Email", value: settings.email || "—" },
              { label: "Facebook", value: settings.facebook || "No configurado" },
              { label: "TikTok", value: settings.tiktok || "No configurado" },
            ].map((item) => (
              <div key={item.label}>
                <dt
                  className="text-[10px] tracking-[0.3em] text-taupe/50 uppercase mb-0.5"
                  style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                >
                  {item.label}
                </dt>
                <dd
                  className="text-sm text-dark"
                  style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-taupe/50" style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}>
            No se pudo cargar la configuración.
          </p>
        )}
      </div>
    </div>
  );
}
