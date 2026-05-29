"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import type { Post } from "@/lib/types";

const ic =
  "w-full border border-[#DDD2C4] bg-white px-3 py-2.5 text-sm text-[#2C2825] focus:outline-none focus:border-[#C7AA7A] transition-colors duration-200";
const lc =
  "text-[10px] tracking-[0.25em] text-[#6F6963] uppercase block mb-1.5";
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

const CATEGORIES = ["Bodas", "Regalos", "Self-Care", "Bienestar", "Eventos"];

export default function EditPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [form, setForm] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}`).then((r) => {
      if (!r.ok) { setNotFound(true); return; }
      r.json().then(setForm);
    });
  }, [slug]);

  if (notFound)
    return (
      <div className="p-8" style={sans}>
        <p className="text-sm text-red-400 mb-4">Artículo no encontrado.</p>
        <button
          onClick={async () => {
            await fetch(`/api/posts/${slug}`, { method: "DELETE" });
            router.push("/admin/posts");
          }}
          className="text-xs text-red-500 underline"
        >
          Eliminar registro huérfano
        </button>
      </div>
    );

  if (!form)
    return (
      <div className="p-8 text-sm text-[#6F6963]" style={sans}>
        Cargando...
      </div>
    );

  const set = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setDone(true);
    setTimeout(() => router.push("/admin/posts"), 1200);
  };

  const destroy = async () => {
    if (!confirm(`¿Eliminar "${form.title}"?`)) return;
    setDeleting(true);
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    router.push("/admin/posts");
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
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-3xl text-[#2C2825]" style={serif}>
          Editar Artículo
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
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={set}
            required
            className={ic}
            style={sans}
          />
          <p className="text-[11px] text-[#6F6963]/50 mt-1" style={sans}>
            URL: /blog/{form.slug}
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
              {uploading ? "Subiendo..." : "Cambiar imagen"}
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
            rows={18}
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
          {done ? "¡Guardado! Redirigiendo..." : saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
