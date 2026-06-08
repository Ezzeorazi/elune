"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCustomizationEditor from "@/components/admin/ProductCustomizationEditor";

const ic =
  "w-full border border-warm-beige bg-white px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors duration-200";
const lc =
  "text-[10px] tracking-[0.25em] text-taupe uppercase block mb-1.5";
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

export default function EditProductoPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [form, setForm] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  if (!form)
    return (
      <div className="p-8 text-sm text-taupe" style={sans}>
        Cargando...
      </div>
    );

  const set = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((p) =>
      p
        ? {
            ...p,
            [name]:
              type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value,
          }
        : p
    );
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { signedUrl, publicUrl } = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name }),
      }).then((r) => r.json());
      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });
      setForm((p) => (p ? { ...p, image: publicUrl } : p));
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: Number(form.order) }),
    });
    setDone(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  const destroy = async () => {
    if (!confirm(`¿Eliminar "${form.name}"?`)) return;
    setDeleting(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.push("/admin/products");
  };

  return (
    <div className="p-8 max-w-xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-taupe hover:text-dark transition-colors duration-200 mb-6"
        style={sans}
      >
        <ArrowLeft size={13} /> Volver
      </Link>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-3xl text-dark" style={serif}>
          Editar Producto
        </h1>
        <button
          onClick={destroy}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors duration-200"
          style={sans}
        >
          <Trash2 size={13} />
          {deleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className={lc} style={sans}>ID</label>
          <input type="text" name="id" value={form.id} onChange={set} required className={ic} style={sans} />
        </div>

        <div>
          <label className={lc} style={sans}>Nombre</label>
          <input type="text" name="name" value={form.name} onChange={set} required className={ic} style={sans} />
        </div>

        <div>
          <label className={lc} style={sans}>Descripción</label>
          <textarea name="description" value={form.description} onChange={set} rows={3} className={`${ic} resize-none`} style={sans} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc} style={sans}>Etiqueta</label>
            <input type="text" name="tag" value={form.tag} onChange={set} className={ic} style={sans} />
          </div>
          <div>
            <label className={lc} style={sans}>Orden</label>
            <input type="number" name="order" value={form.order} onChange={set} className={ic} style={sans} />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>Imagen</label>
          <div className="space-y-2">
            {form.image && (
              <p className="text-xs text-taupe truncate" style={sans}>✓ {form.image}</p>
            )}
            <label className="inline-flex items-center gap-2 cursor-pointer border border-warm-beige bg-white px-3 py-2 text-xs text-taupe hover:border-soft-gold transition-colors duration-200">
              <Upload size={12} />
              {uploading ? "Subiendo..." : "Cambiar imagen"}
              <input type="file" accept="image/*" onChange={upload} className="hidden" />
            </label>
            <input type="text" name="image" value={form.image} onChange={set} placeholder="/image/mi-foto.webp" className={ic} style={sans} />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>Color de fondo</label>
          <div className="flex items-center gap-3">
            <input type="color" name="bg" value={form.bg} onChange={set} className="w-10 h-10 border border-warm-beige cursor-pointer rounded-none" />
            <input type="text" name="bg" value={form.bg} onChange={set} className={`${ic} flex-1`} style={sans} />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>Enlace</label>
          <input type="text" name="href" value={form.href} onChange={set} className={ic} style={sans} />
          <p className="text-[11px] text-taupe/60 mt-1" style={sans}>
            Solo aplica si el producto no tiene opciones de personalización.
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" checked={form.published} onChange={set} className="w-4 h-4 accent-soft-gold" />
          <span className="text-sm text-dark" style={sans}>Publicado</span>
        </label>

        <ProductCustomizationEditor
          price={form.price}
          includes={form.includes ?? []}
          options={form.options ?? []}
          artisanalNote={form.artisanalNote ?? ""}
          onChange={(fields) => setForm((p) => (p ? { ...p, ...fields } : p))}
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-dark text-cream text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-soft-gold transition-colors duration-300 disabled:opacity-50"
          style={sans}
        >
          {done ? "¡Guardado! Redirigiendo..." : saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
