"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  Settings,
  MessageSquare,
  FileSpreadsheet,
  Star,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Productos", icon: Package, exact: false },
  { href: "/admin/posts", label: "Artículos", icon: FileText, exact: false },
  { href: "/admin/presupuestos", label: "Presupuestos", icon: FileSpreadsheet, exact: false },
  { href: "/admin/testimonials", label: "Testimonios", icon: Star, exact: false },
  { href: "/admin/contacts", label: "Mensajes", icon: MessageSquare, exact: false },
  { href: "/admin/settings", label: "Configuración", icon: Settings, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10001 h-12 bg-dark flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/isotipo-elune-flor-loto.svg" alt="" className="h-4 w-auto" />
          <span
            className="text-cream text-base tracking-[0.2em]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            ELUNÈ
          </span>
          <span
            className="text-cream/40 text-[9px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-cream/70 hover:text-cream p-1"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-9998 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed md:static inset-y-0 left-0 z-9999",
          "w-56 bg-dark text-cream flex flex-col shrink-0 h-full",
          "transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo — desktop */}
        <div className="hidden md:block p-6 border-b border-white/10">
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

        {/* Mobile: space for top bar */}
        <div className="md:hidden h-12 shrink-0" />

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-200",
                  isActive
                    ? "bg-soft-gold/20 text-soft-gold"
                    : "text-cream/50 hover:text-cream hover:bg-white/5",
                ].join(" ")}
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
    </>
  );
}
