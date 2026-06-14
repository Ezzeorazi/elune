"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Productos", href: "/productos" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Blog", href: "/blog" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo-elune-principal.svg"
              alt="ELUNÈ"
              className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="nav-link font-sans text-sm tracking-widest text-taupe hover:text-dark transition-colors duration-300 uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Instagram CTA */}
          <a
            href="https://instagram.com/madebyelune"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-sans tracking-widest text-soft-gold border border-soft-gold px-4 py-1.5 hover:bg-soft-gold hover:text-cream transition-all duration-300"
          >
            @madebyelune
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-dark p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-opacity duration-300 flex flex-col justify-center items-center gap-10 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <img src="/logo-elune-circular.svg" alt="ELUNÈ" className="w-20 h-20 mb-2" />
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-dark hover:text-soft-gold transition-colors duration-300 italic"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="https://instagram.com/madebyelune"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-sans tracking-widest text-taupe mt-4"
        >
          @madebyelune
        </a>
      </div>
    </>
  );
}
