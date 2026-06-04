"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, Settings, MessageSquare, Star } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Productos", icon: Package, exact: false },
  { href: "/admin/posts", label: "Artículos", icon: FileText, exact: false },
  { href: "/admin/testimonials", label: "Testimonios", icon: Star, exact: false },
  { href: "/admin/contacts", label: "Mensajes", icon: MessageSquare, exact: false },
  { href: "/admin/settings", label: "Configuración", icon: Settings, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-dark text-cream flex flex-col shrink-0 h-full">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5">
          <img src="/isotipo-elune-flor-loto.svg" alt="" className="h-4 w-auto" />
          <div>
            <p
              className="font-serif text-lg tracking-[0.2em] text-cream"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              ELUNÈ
            </p>
            <p
              className="text-[9px] tracking-[0.35em] text-cream/40 uppercase"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Admin
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-200 ${
                (item.exact ? pathname === item.href : pathname.startsWith(item.href))
                  ? "bg-soft-gold/20 text-soft-gold"
                  : "text-cream/50 hover:text-cream hover:bg-white/5"
              }`}
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              <item.icon size={15} strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          Ver sitio ↗
        </Link>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-1.5 text-xs text-cream/30 hover:text-red-400 transition-colors duration-200 text-left"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
