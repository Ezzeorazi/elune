import Link from "next/link";
import { getSettings } from "@/lib/data";

function InstagramIcon({ size = 16 }: { size?: number }) {
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

function FacebookIcon({ size = 16 }: { size?: number }) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
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
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
  const settings = getSettings();

  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/isotipo-elune-flor-loto.svg" alt="" className="w-8 h-8" />
            <span className="font-serif text-2xl tracking-[0.2em] text-cream font-medium">
              ELUNÈ
            </span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-cream/60 max-w-xs mb-6">
            El arte de regalar con intención. Jabones artesanales, boxes de
            regalo y souvenirs para momentos especiales.
          </p>

          {/* Social links — only shown if configured */}
          <div className="flex flex-col gap-2">
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-soft-gold hover:text-cream transition-colors duration-300 text-sm font-sans tracking-widest"
              >
                <InstagramIcon size={16} />
                {settings.instagram}
              </a>
            )}
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-soft-gold hover:text-cream transition-colors duration-300 text-sm font-sans tracking-widest"
              >
                <FacebookIcon size={16} />
                {settings.facebook}
              </a>
            )}
            {settings.tiktokUrl && (
              <a
                href={settings.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-soft-gold hover:text-cream transition-colors duration-300 text-sm font-sans tracking-widest"
              >
                <TikTokIcon size={16} />
                {settings.tiktok}
              </a>
            )}
          </div>
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
