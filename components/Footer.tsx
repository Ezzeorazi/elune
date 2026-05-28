import Link from "next/link";
import Lotus from "@/components/icons/Lotus";
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerLinks = [
  {
    heading: "Explorar",
    links: [
      { label: "Inicio", href: "/#inicio" },
      { label: "Productos", href: "/#productos" },
      { label: "Catálogo", href: "/#catalogo" },
    ],
  },
  {
    heading: "Nosotros",
    links: [
      { label: "Quiénes Somos", href: "/#quienes-somos" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Lotus className="w-8 h-8 text-soft-gold" />
            <span className="font-serif text-2xl tracking-[0.2em] text-cream font-medium">
              ELUNÈ
            </span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-cream/60 max-w-xs mb-6">
            El arte de regalar con intención. Jabones artesanales, boxes de
            regalo y souvenirs para momentos especiales.
          </p>
          <a
            href="https://instagram.com/madebyelune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-soft-gold hover:text-cream transition-colors duration-300 text-sm font-sans tracking-widest"
          >
            <InstagramIcon size={16} />
            @madebyelune
          </a>
        </div>

        {/* Links */}
        {footerLinks.map((col) => (
          <div key={col.heading}>
            <h4 className="font-serif text-cream text-base tracking-widest mb-5 font-medium">
              {col.heading}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/50 hover:text-soft-gold transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/30 tracking-widest">
            © {new Date().getFullYear()} ELUNÈ. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-cream/30 tracking-widest italic">
            El arte de regalar con intención
          </p>
        </div>
      </div>
    </footer>
  );
}
