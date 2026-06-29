"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import type { Product, Settings, PresupuestoItem } from "@/lib/types";

interface Props {
  products: Product[];
  settings: Settings;
}

const FONT_SERIF = "var(--font-cormorant), Georgia, serif";
const FONT_SANS = "var(--font-jost), system-ui, sans-serif";

const emptyItem = (): PresupuestoItem => ({
  descripcion: "",
  cantidad: 1,
  precio_unitario: 0,
  subtotal: 0,
});

export default function PresupuestoForm({ products, settings }: Props) {
  const router = useRouter();

  // Client info
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");

  // Items
  const [items, setItems] = useState<PresupuestoItem[]>([emptyItem()]);

  // IVA
  const [conIva, setConIva] = useState(false);
  const [ivaPorcentaje, setIvaPorcentaje] = useState(16);

  // Notes
  const [notas, setNotas] = useState("");

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [productPickerIndex, setProductPickerIndex] = useState<number | null>(null);

  // ── Calculations ───────────────────────────────────────────────
  const subtotal = items.reduce((s, it) => s + it.subtotal, 0);
  const ivaMonto = conIva ? subtotal * (ivaPorcentaje / 100) : 0;
  const total = subtotal + ivaMonto;

  // ── Item helpers ───────────────────────────────────────────────
  const updateItem = useCallback(
    (index: number, field: keyof PresupuestoItem, raw: string | number) => {
      setItems((prev) => {
        const next = [...prev];
        const item = { ...next[index] };
        if (field === "descripcion") {
          item.descripcion = raw as string;
        } else if (field === "cantidad") {
          item.cantidad = Math.max(0, Number(raw));
        } else if (field === "precio_unitario") {
          item.precio_unitario = Math.max(0, Number(raw));
        }
        item.subtotal = item.cantidad * item.precio_unitario;
        next[index] = item;
        return next;
      });
    },
    []
  );

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);

  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const pickProduct = (index: number, product: Product) => {
    setItems((prev) => {
      const next = [...prev];
      const item = { ...next[index] };
      item.descripcion = product.name;
      if (product.price != null) {
        item.precio_unitario = product.price;
        item.subtotal = item.cantidad * item.precio_unitario;
      }
      next[index] = item;
      return next;
    });
    setProductPickerIndex(null);
  };

  // ── Save ───────────────────────────────────────────────────────
  const handleSave = async (goToPdf = false) => {
    if (!clienteNombre.trim()) {
      setError("El nombre del cliente es obligatorio.");
      return;
    }
    if (items.some((it) => !it.descripcion.trim())) {
      setError("Todos los ítems deben tener descripción.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/presupuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_nombre: clienteNombre.trim(),
          cliente_email: clienteEmail.trim(),
          cliente_telefono: clienteTelefono.trim(),
          items,
          subtotal,
          iva_porcentaje: conIva ? ivaPorcentaje : null,
          iva_monto: conIva ? ivaMonto : null,
          total,
          notas: notas.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Error al guardar");
      }
      const { id } = await res.json();
      router.push(`/admin/presupuestos/${id}${goToPdf ? "?pdf=1" : ""}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setSaving(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-dark" style={{ fontFamily: FONT_SERIF }}>
          Nuevo presupuesto
        </h1>
        <p className="text-sm text-taupe mt-1" style={{ fontFamily: FONT_SANS }}>
          Completá los datos y guardá para generar el PDF.
        </p>
      </div>

      {/* Cliente */}
      <section className="bg-white border border-warm-beige p-5 mb-4">
        <p className="text-[10px] tracking-[0.3em] text-taupe uppercase mb-4" style={{ fontFamily: FONT_SANS }}>
          Datos del cliente
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[10px] tracking-[0.25em] text-taupe/60 uppercase mb-1" style={{ fontFamily: FONT_SANS }}>
              Nombre *
            </label>
            <input
              type="text"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              placeholder="Ej. María García"
              className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors"
              style={{ fontFamily: FONT_SANS }}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.25em] text-taupe/60 uppercase mb-1" style={{ fontFamily: FONT_SANS }}>
              Email
            </label>
            <input
              type="email"
              value={clienteEmail}
              onChange={(e) => setClienteEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors"
              style={{ fontFamily: FONT_SANS }}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.25em] text-taupe/60 uppercase mb-1" style={{ fontFamily: FONT_SANS }}>
              Teléfono / WhatsApp
            </label>
            <input
              type="text"
              value={clienteTelefono}
              onChange={(e) => setClienteTelefono(e.target.value)}
              placeholder={settings.whatsapp || "52 1 XXX XXX XXXX"}
              className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors"
              style={{ fontFamily: FONT_SANS }}
            />
          </div>
        </div>
      </section>

      {/* Ítems */}
      <section className="bg-white border border-warm-beige p-5 mb-4">
        <p className="text-[10px] tracking-[0.3em] text-taupe uppercase mb-4" style={{ fontFamily: FONT_SANS }}>
          Ítems
        </p>

        {/* Header row — desktop */}
        <div className="hidden sm:grid grid-cols-[1fr_80px_110px_100px_32px] gap-2 mb-2">
          {["Descripción", "Cant.", "Precio unit.", "Subtotal", ""].map((h) => (
            <p key={h} className="text-[9px] tracking-[0.25em] text-taupe/50 uppercase" style={{ fontFamily: FONT_SANS }}>
              {h}
            </p>
          ))}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_110px_100px_32px] gap-2 items-start sm:items-center">
              {/* Descripción con picker de productos */}
              <div className="relative">
                <input
                  type="text"
                  value={item.descripcion}
                  onChange={(e) => updateItem(index, "descripcion", e.target.value)}
                  placeholder="Descripción del producto/servicio"
                  className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors pr-8"
                  style={{ fontFamily: FONT_SANS }}
                />
                {products.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setProductPickerIndex(productPickerIndex === index ? null : index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-taupe/40 hover:text-soft-gold transition-colors"
                    title="Seleccionar producto del catálogo"
                  >
                    <ChevronDown size={14} />
                  </button>
                )}
                {productPickerIndex === index && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-warm-beige shadow-lg mt-0.5 max-h-52 overflow-y-auto">
                    {products.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => pickProduct(index, prod)}
                        className="w-full text-left px-3 py-2 text-sm text-dark hover:bg-cream transition-colors border-b border-warm-beige/50 last:border-0"
                        style={{ fontFamily: FONT_SANS }}
                      >
                        <span className="font-medium">{prod.name}</span>
                        {prod.price != null && (
                          <span className="ml-2 text-xs text-taupe">
                            ${prod.price.toLocaleString("es-MX")}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cantidad */}
              <div>
                <label className="sm:hidden text-[9px] tracking-[0.25em] text-taupe/50 uppercase mb-1 block" style={{ fontFamily: FONT_SANS }}>Cant.</label>
                <input
                  type="number"
                  min="0"
                  value={item.cantidad}
                  onChange={(e) => updateItem(index, "cantidad", e.target.value)}
                  className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors text-right"
                  style={{ fontFamily: FONT_SANS }}
                />
              </div>

              {/* Precio unitario */}
              <div>
                <label className="sm:hidden text-[9px] tracking-[0.25em] text-taupe/50 uppercase mb-1 block" style={{ fontFamily: FONT_SANS }}>Precio unit.</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe/50 text-sm" style={{ fontFamily: FONT_SANS }}>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.precio_unitario}
                    onChange={(e) => updateItem(index, "precio_unitario", e.target.value)}
                    className="w-full border border-warm-beige bg-cream px-3 py-2 pl-6 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors text-right"
                    style={{ fontFamily: FONT_SANS }}
                  />
                </div>
              </div>

              {/* Subtotal (read-only) */}
              <div>
                <label className="sm:hidden text-[9px] tracking-[0.25em] text-taupe/50 uppercase mb-1 block" style={{ fontFamily: FONT_SANS }}>Subtotal</label>
                <p
                  className="px-3 py-2 text-sm text-dark text-right border border-transparent bg-cream/50"
                  style={{ fontFamily: FONT_SANS }}
                >
                  ${item.subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </p>
              </div>

              {/* Delete */}
              <div className="flex sm:justify-center">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-1.5 text-taupe/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center gap-1.5 text-xs text-taupe/60 hover:text-soft-gold transition-colors duration-200"
          style={{ fontFamily: FONT_SANS }}
        >
          <Plus size={13} /> Agregar ítem
        </button>
      </section>

      {/* Totales + IVA */}
      <section className="bg-white border border-warm-beige p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] tracking-[0.3em] text-taupe uppercase" style={{ fontFamily: FONT_SANS }}>
            Totales
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-taupe" style={{ fontFamily: FONT_SANS }}>
              Agregar IVA
            </span>
            <button
              type="button"
              onClick={() => setConIva((v) => !v)}
              className={[
                "relative w-9 h-5 rounded-full transition-colors duration-200",
                conIva ? "bg-soft-gold" : "bg-warm-beige",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                  conIva ? "translate-x-4" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-taupe" style={{ fontFamily: FONT_SANS }}>Subtotal</span>
            <span className="text-sm text-dark" style={{ fontFamily: FONT_SANS }}>
              ${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {conIva && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-taupe" style={{ fontFamily: FONT_SANS }}>IVA</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={ivaPorcentaje}
                    onChange={(e) => setIvaPorcentaje(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-14 border border-warm-beige bg-cream px-2 py-0.5 text-sm text-dark text-center focus:outline-none focus:border-soft-gold transition-colors"
                    style={{ fontFamily: FONT_SANS }}
                  />
                  <span className="text-sm text-taupe" style={{ fontFamily: FONT_SANS }}>%</span>
                </div>
              </div>
              <span className="text-sm text-dark" style={{ fontFamily: FONT_SANS }}>
                ${ivaMonto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-warm-beige">
            <span className="text-sm font-semibold text-dark" style={{ fontFamily: FONT_SANS }}>Total</span>
            <span className="text-xl text-dark" style={{ fontFamily: FONT_SERIF }}>
              ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </section>

      {/* Notas */}
      <section className="bg-white border border-warm-beige p-5 mb-6">
        <label className="block text-[10px] tracking-[0.3em] text-taupe uppercase mb-3" style={{ fontFamily: FONT_SANS }}>
          Notas (opcional)
        </label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={3}
          placeholder="Condiciones de pago, validez del presupuesto, observaciones..."
          className="w-full border border-warm-beige bg-cream px-3 py-2 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors resize-none"
          style={{ fontFamily: FONT_SANS }}
        />
      </section>

      {/* Error */}
      {error && (
        <p className="mb-4 text-sm text-red-500" style={{ fontFamily: FONT_SANS }}>
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
          className="flex-1 bg-dark text-cream text-xs tracking-[0.2em] uppercase py-3 hover:bg-soft-gold transition-colors duration-200 disabled:opacity-50"
          style={{ fontFamily: FONT_SANS }}
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
          className="flex-1 border border-dark text-dark text-xs tracking-[0.2em] uppercase py-3 hover:bg-dark hover:text-cream transition-colors duration-200 disabled:opacity-50"
          style={{ fontFamily: FONT_SANS }}
        >
          {saving ? "Guardando..." : "Guardar y generar PDF"}
        </button>
      </div>
    </div>
  );
}
