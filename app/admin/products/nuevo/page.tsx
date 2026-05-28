"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

const ic =
  "w-full border border-[#DDD2C4] bg-white px-3 py-2.5 text-sm text-[#2C2825] focus:outline-none focus:border-[#C7AA7A] transition-colors duration-200";
const lc =
  "text-[10px] tracking-[0.25em] text-[#6F6963] uppercase block mb-1.5";
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

export default function NuevoProductoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    tag: "",
    image: "",
    href: "/#contacto",
    bg: "#f5f1eb",
    order: 99,
    published: true,
  });

  const set = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((p) => ({
      ...p,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setForm((p) => ({ ...p, image: data.url }));
    setUploading(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: Number(form.order) }),
    });
    setDone(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  return (
    <div className="p-8 max-w-xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-[#6F6963] hover:text-[#2C2825] transition-colors duration-200 mb-6"
        style={sans}
      >
        <ArrowLeft size={13} /> Volver
      </Link>
      <h1 className="text-3xl text-[#2C2825] mb-7" style={serif}>
        Nuevo Producto
      </h1>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className={lc} style={sans}>
            ID (slug único)
          </label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={set}
            required
            placeholder="jabones-artesanales"
            className={ic}
            style={sans}
          />
        </div>

        <div>
          <label className={lc} style={sans}>
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={set}
            required
            className={ic}
            style={sans}
          />
        </div>

        <div>
          <label className={lc} style={sans}>
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={set}
            rows={3}
            className={`${ic} resize-none`}
            style={sans}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc} style={sans}>
              Etiqueta
            </label>
            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={set}
              placeholder="Bestseller"
              className={ic}
              style={sans}
            />
          </div>
          <div>
            <label className={lc} style={sans}>
              Orden
            </label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={set}
              className={ic}
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Imagen
          </label>
          <div className="space-y-2">
            {form.image && (
              <p className="text-xs text-[#6F6963] truncate" style={sans}>
                ✓ {form.image}
              </p>
            )}
            <label className="inline-flex items-center gap-2 cursor-pointer border border-[#DDD2C4] bg-white px-3 py-2 text-xs text-[#6F6963] hover:border-[#C7AA7A] transition-colors duration-200">
              <Upload size={12} />
              {uploading ? "Subiendo..." : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                onChange={upload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-[#6F6963]/50" style={sans}>
              O pegá la URL:
            </p>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={set}
              placeholder="/image/mi-foto.webp"
              className={ic}
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Color de fondo
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              name="bg"
              value={form.bg}
              onChange={set}
              className="w-10 h-10 border border-[#DDD2C4] cursor-pointer rounded-none"
            />
            <input
              type="text"
              name="bg"
              value={form.bg}
              onChange={set}
              className={`${ic} flex-1`}
              placeholder="#f5f1eb"
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Enlace
          </label>
          <input
            type="text"
            name="href"
            value={form.href}
            onChange={set}
            className={ic}
            style={sans}
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={set}
            className="w-4 h-4 accent-[#C7AA7A]"
          />
          <span className="text-sm text-[#2C2825]" style={sans}>
            Publicado
          </span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#2C2825] text-[#F5F1EB] text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#C7AA7A] transition-colors duration-300 disabled:opacity-50"
          style={sans}
        >
          {done ? "¡Guardado! Redirigiendo..." : saving ? "Guardando..." : "Guardar producto"}
        </button>
      </form>
    </div>
  );
}
