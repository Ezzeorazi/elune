import Link from "next/link";
import { getProducts, getPosts, getSettings, getContacts } from "@/lib/data";
import { Package, FileText, ArrowRight, Settings, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [products, posts, settings, contacts] = await Promise.all([
    getProducts(),
    getPosts(),
    getSettings(),
    getContacts(),
  ]);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1
          className="text-3xl text-[#2C2825]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Dashboard
        </h1>
        <p
          className="text-sm text-[#6F6963] mt-1"
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
            className="bg-white border border-[#DDD2C4] p-6 hover:border-[#C7AA7A] transition-colors duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <p
                className="text-xs tracking-[0.25em] text-[#6F6963] uppercase"
                style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
              >
                {card.label}
              </p>
              <card.icon size={18} className="text-[#C7AA7A]" strokeWidth={1} />
            </div>
            <p
              className="text-5xl text-[#2C2825] mb-1"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {card.value}
            </p>
            <p
              className="text-xs text-[#6F6963]/60"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              {card.sub} (de {card.total})
            </p>
            <div
              className="flex items-center gap-1 mt-4 text-xs text-[#6F6963] group-hover:text-[#C7AA7A] transition-colors duration-200"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Ver todos <ArrowRight size={11} />
            </div>
          </Link>
        ))}
      </div>

      {/* Settings preview */}
      <div className="bg-white border border-[#DDD2C4] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Settings size={15} className="text-[#C7AA7A]" strokeWidth={1.5} />
            <p
              className="text-xs tracking-[0.25em] text-[#6F6963] uppercase"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Configuración global
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs text-[#C7AA7A] hover:text-[#2C2825] transition-colors duration-200"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Editar →
          </Link>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Instagram", value: settings.instagram || "—" },
            { label: "WhatsApp", value: settings.whatsapp || "—" },
            { label: "Email", value: settings.email || "—" },
            {
              label: "Facebook",
              value: settings.facebook || "No configurado",
            },
            { label: "TikTok", value: settings.tiktok || "No configurado" },
          ].map((item) => (
            <div key={item.label}>
              <dt
                className="text-[10px] tracking-[0.3em] text-[#6F6963]/50 uppercase mb-0.5"
                style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
              >
                {item.label}
              </dt>
              <dd
                className="text-sm text-[#2C2825]"
                style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
