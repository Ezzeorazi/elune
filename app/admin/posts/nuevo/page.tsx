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

const CATEGORIES = ["Bodas", "Regalos", "Self-Care", "Bienestar", "Eventos"];

function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NuevoPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    category: "Regalos",
    date: "",
    readTime: "",
    excerpt: "",
    image: "",
    bg: "#f5ede8",
    content: "",
    published: true,
  });

  const set = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newVal =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((p) => {
      const next = { ...p, [name]: newVal };
      if (name === "title" && !p.slug) {
        next.slug = toSlug(value);
      }
      return next;
    });
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
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setDone(true);
    setTimeout(() => router.push("/admin/posts"), 1200);
  };

  return (
    <div className="p-8 max-w-2xl">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-xs text-[#6F6963] hover:text-[#2C2825] transition-colors duration-200 mb-6"
        style={sans}
      >
        <ArrowLeft size={13} /> Volver
      </Link>
      <h1 className="text-3xl text-[#2C2825] mb-7" style={serif}>
        Nuevo Artículo
      </h1>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className={lc} style={sans}>
            Título
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={set}
            required
            className={ic}
            style={sans}
          />
        </div>

        <div>
          <label className={lc} style={sans}>
            Slug (URL)
          </label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={set}
            required
            placeholder="mi-articulo"
            className={ic}
            style={sans}
          />
          <p className="text-[11px] text-[#6F6963]/50 mt-1" style={sans}>
            Se genera automáticamente del título. URL: /blog/{form.slug || "..."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lc} style={sans}>
              Categoría
            </label>
            <select
              name="category"
              value={form.category}
              onChange={set}
              className={`${ic} appearance-none`}
              style={sans}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={lc} style={sans}>
              Tiempo de lectura
            </label>
            <input
              type="text"
              name="readTime"
              value={form.readTime}
              onChange={set}
              placeholder="5 min"
              className={ic}
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Fecha
          </label>
          <input
            type="text"
            name="date"
            value={form.date}
            onChange={set}
            placeholder="15 de mayo, 2025"
            className={ic}
            style={sans}
          />
        </div>

        <div>
          <label className={lc} style={sans}>
            Resumen
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={set}
            rows={2}
            className={`${ic} resize-none`}
            style={sans}
          />
        </div>

        <div>
          <label className={lc} style={sans}>
            Imagen de portada
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
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={set}
              placeholder="/image/portada.webp"
              className={ic}
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Color de fondo (tarjeta)
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
              style={sans}
            />
          </div>
        </div>

        <div>
          <label className={lc} style={sans}>
            Contenido
          </label>
          <p className="text-[11px] text-[#6F6963]/50 mb-2" style={sans}>
            Usá ## para títulos, **texto** para negrita, y números para listas.
          </p>
          <textarea
            name="content"
            value={form.content}
            onChange={set}
            required
            rows={14}
            className={`${ic} resize-y font-mono text-xs`}
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
          {done ? "¡Guardado! Redirigiendo..." : saving ? "Guardando..." : "Publicar artículo"}
        </button>
      </form>
    </div>
  );
}
