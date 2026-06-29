"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import type { Presupuesto, Settings } from "@/lib/types";

interface Props {
  presupuesto: Presupuesto;
  settings: Settings;
  autoPdf: boolean;
}

const FONT_SERIF = "var(--font-cormorant), Georgia, serif";
const FONT_SANS = "var(--font-jost), system-ui, sans-serif";

export default function PresupuestoDetail({ presupuesto: p, settings, autoPdf }: Props) {
  useEffect(() => {
    if (autoPdf) generatePdf();
  }, [autoPdf]); // eslint-disable-line react-hooks/exhaustive-deps

  const generatePdf = async () => {
    const { jsPDF } = await import("jspdf");

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const margin = 18;
    let y = margin;

    const gold = [199, 170, 122] as [number, number, number];
    const dark = [44, 40, 37] as [number, number, number];
    const taupe = [111, 105, 99] as [number, number, number];
    const beige = [221, 210, 196] as [number, number, number];

    // ── Header ────────────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...dark);
    doc.text("ELUNÈ", margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...taupe);
    doc.text("Jabones artesanales & souvenirs", margin, y + 5);

    // Company info (right)
    const infoLines: string[] = [];
    if (settings.email) infoLines.push(settings.email);
    if (settings.whatsapp) infoLines.push(`WhatsApp: ${settings.whatsapp}`);
    if (settings.instagram) infoLines.push(`@${settings.instagram}`);

    infoLines.forEach((line, i) => {
      doc.text(line, W - margin, y + i * 4.5, { align: "right" });
    });

    y += 14;

    // Gold separator
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.4);
    doc.line(margin, y, W - margin, y);
    y += 8;

    // ── Budget info ───────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...dark);
    doc.text(`Presupuesto #${p.numero}`, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...taupe);
    const fecha = new Date(p.created_at).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.text(fecha, W - margin, y, { align: "right" });
    y += 10;

    // ── Client info ───────────────────────────────────────────────
    doc.setFillColor(245, 241, 235);
    doc.rect(margin, y, W - margin * 2, p.cliente_email || p.cliente_telefono ? 16 : 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...taupe);
    doc.text("PARA", margin + 3, y + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...dark);
    doc.text(p.cliente_nombre, margin + 3, y + 9);

    if (p.cliente_email || p.cliente_telefono) {
      doc.setFontSize(7.5);
      doc.setTextColor(...taupe);
      const sub = [p.cliente_email, p.cliente_telefono].filter(Boolean).join(" · ");
      doc.text(sub, margin + 3, y + 14);
      y += 18;
    } else {
      y += 12;
    }

    y += 6;

    // ── Items table ───────────────────────────────────────────────
    const colDesc = margin;
    const colCant = W - margin - 70;
    const colPrecio = W - margin - 42;
    const colSub = W - margin - 0;

    // Table header
    doc.setFillColor(...gold);
    doc.rect(margin, y, W - margin * 2, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(245, 241, 235);
    doc.text("DESCRIPCIÓN", colDesc + 2, y + 4.5);
    doc.text("CANT.", colCant, y + 4.5, { align: "right" });
    doc.text("P. UNIT.", colPrecio, y + 4.5, { align: "right" });
    doc.text("SUBTOTAL", colSub, y + 4.5, { align: "right" });
    y += 8;

    // Items rows
    p.items.forEach((item, i) => {
      const rowH = 7.5;
      if (i % 2 === 0) {
        doc.setFillColor(250, 248, 245);
        doc.rect(margin, y, W - margin * 2, rowH, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...dark);

      const maxW = colCant - colDesc - 4;
      const lines = doc.splitTextToSize(item.descripcion, maxW);
      doc.text(lines[0], colDesc + 2, y + 5);

      doc.text(String(item.cantidad), colCant, y + 5, { align: "right" });
      doc.text(
        `$${item.precio_unitario.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`,
        colPrecio,
        y + 5,
        { align: "right" }
      );
      doc.text(
        `$${item.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`,
        colSub,
        y + 5,
        { align: "right" }
      );
      y += rowH;
    });

    y += 4;

    // ── Totals ────────────────────────────────────────────────────
    const totalsX = W - margin - 70;
    const totalsW = 70;

    const totalsRight = W - margin;

    doc.setDrawColor(...beige);
    doc.setLineWidth(0.3);
    doc.line(totalsX, y, W - margin, y);
    y += 5;

    const addTotal = (label: string, value: string, bold = false) => {
      if (bold) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
      }
      doc.setTextColor(...(bold ? dark : taupe));
      doc.text(label, totalsX + 2, y);
      doc.text(value, totalsRight, y, { align: "right" });
      y += bold ? 7 : 5.5;
    };

    addTotal("Subtotal", `$${p.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`);

    if (p.iva_porcentaje != null && p.iva_monto != null) {
      addTotal(
        `IVA (${p.iva_porcentaje}%)`,
        `$${p.iva_monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`
      );
    }

    doc.setDrawColor(...gold);
    doc.setLineWidth(0.4);
    doc.line(totalsX, y, W - margin, y);
    y += 4;

    addTotal("TOTAL", `$${p.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`, true);

    // ── Notes ─────────────────────────────────────────────────────
    if (p.notas) {
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...taupe);
      doc.text("NOTAS", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...dark);
      const notaLines = doc.splitTextToSize(p.notas, W - margin * 2);
      doc.text(notaLines, margin, y);
    }

    // ── Footer ────────────────────────────────────────────────────
    const pageH = doc.internal.pageSize.getHeight();
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.line(margin, pageH - 14, W - margin, pageH - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...taupe);
    doc.text("ELUNÈ · madebyelune.com", W / 2, pageH - 9, { align: "center" });

    doc.save(`presupuesto-${p.numero}-${p.cliente_nombre.replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      {/* Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/presupuestos"
          className="flex items-center gap-1.5 text-sm text-taupe hover:text-dark transition-colors"
          style={{ fontFamily: FONT_SANS }}
        >
          <ArrowLeft size={14} /> Presupuestos
        </Link>
        <button
          onClick={generatePdf}
          className="flex items-center gap-2 bg-dark text-cream text-xs tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-soft-gold transition-colors duration-200"
          style={{ fontFamily: FONT_SANS }}
        >
          <Download size={14} /> Descargar PDF
        </button>
      </div>

      {/* Preview card */}
      <div className="bg-white border border-warm-beige p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl text-dark" style={{ fontFamily: FONT_SERIF }}>
              ELUNÈ
            </h1>
            <p className="text-xs text-taupe mt-0.5" style={{ fontFamily: FONT_SANS }}>
              Jabones artesanales &amp; souvenirs
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl text-soft-gold" style={{ fontFamily: FONT_SERIF }}>
              #{p.numero}
            </p>
            <p className="text-xs text-taupe mt-0.5" style={{ fontFamily: FONT_SANS }}>
              {new Date(p.created_at).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="border-t border-warm-beige" />

        {/* Client */}
        <div className="bg-cream px-4 py-3">
          <p className="text-[9px] tracking-[0.3em] text-taupe/60 uppercase mb-1" style={{ fontFamily: FONT_SANS }}>
            Para
          </p>
          <p className="text-base text-dark font-medium" style={{ fontFamily: FONT_SANS }}>
            {p.cliente_nombre}
          </p>
          {(p.cliente_email || p.cliente_telefono) && (
            <p className="text-xs text-taupe mt-0.5" style={{ fontFamily: FONT_SANS }}>
              {[p.cliente_email, p.cliente_telefono].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        {/* Items */}
        <div>
          <div className="hidden sm:grid grid-cols-[1fr_60px_100px_100px] gap-2 mb-2">
            {["Descripción", "Cant.", "P. Unit.", "Subtotal"].map((h) => (
              <p key={h} className="text-[9px] tracking-[0.25em] text-taupe/50 uppercase text-right first:text-left" style={{ fontFamily: FONT_SANS }}>
                {h}
              </p>
            ))}
          </div>
          {p.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[1fr_60px_100px_100px] gap-1 sm:gap-2 py-2.5 border-b border-warm-beige/50 last:border-0"
            >
              <p className="text-sm text-dark" style={{ fontFamily: FONT_SANS }}>{item.descripcion}</p>
              <p className="text-sm text-taupe sm:text-right" style={{ fontFamily: FONT_SANS }}>
                <span className="sm:hidden text-[9px] text-taupe/50 uppercase tracking-widest mr-1">Cant. </span>
                {item.cantidad}
              </p>
              <p className="text-sm text-taupe sm:text-right" style={{ fontFamily: FONT_SANS }}>
                <span className="sm:hidden text-[9px] text-taupe/50 uppercase tracking-widest mr-1">P. unit. </span>
                ${item.precio_unitario.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-dark font-medium sm:text-right" style={{ fontFamily: FONT_SANS }}>
                <span className="sm:hidden text-[9px] text-taupe/50 uppercase tracking-widest mr-1">Subtotal </span>
                ${item.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-sm" style={{ fontFamily: FONT_SANS }}>
              <span className="text-taupe">Subtotal</span>
              <span className="text-dark">${p.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
            </div>
            {p.iva_porcentaje != null && p.iva_monto != null && (
              <div className="flex justify-between text-sm" style={{ fontFamily: FONT_SANS }}>
                <span className="text-taupe">IVA ({p.iva_porcentaje}%)</span>
                <span className="text-dark">${p.iva_monto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-soft-gold/40" style={{ fontFamily: FONT_SANS }}>
              <span className="text-sm font-semibold text-dark">Total</span>
              <span className="text-2xl text-dark" style={{ fontFamily: FONT_SERIF }}>
                ${p.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {p.notas && (
          <>
            <div className="border-t border-warm-beige" />
            <div>
              <p className="text-[9px] tracking-[0.3em] text-taupe/60 uppercase mb-2" style={{ fontFamily: FONT_SANS }}>
                Notas
              </p>
              <p className="text-sm text-taupe whitespace-pre-wrap" style={{ fontFamily: FONT_SANS }}>
                {p.notas}
              </p>
            </div>
          </>
        )}

        {/* Company footer */}
        <div className="border-t border-warm-beige pt-4 flex flex-col sm:flex-row sm:justify-between gap-1">
          {[settings.email, settings.whatsapp ? `WhatsApp: ${settings.whatsapp}` : null, settings.instagram ? `@${settings.instagram}` : null]
            .filter(Boolean)
            .map((line) => (
              <p key={line} className="text-xs text-taupe/60" style={{ fontFamily: FONT_SANS }}>
                {line}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
