"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Send, Upload, X } from "lucide-react";

export default function TestimonialForm() {
  const [form, setForm] = useState({ name: "", location: "", text: "" });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);
    try {
      let photoUrl = "";
      if (photoFile) {
        // Get a presigned URL — file goes directly from browser to Supabase (no Vercel size limit)
        const urlRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: photoFile.name }),
        });
        if (!urlRes.ok) throw new Error("No se pudo preparar la subida");
        const { signedUrl, publicUrl } = await urlRes.json();

        const uploadRes = await fetch(signedUrl, {
          method: "PUT",
          headers: { "Content-Type": photoFile.type || "application/octet-stream" },
          body: photoFile,
        });
        if (!uploadRes.ok) throw new Error("No se pudo subir la foto");
        photoUrl = publicUrl as string;
      }

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photo: photoUrl }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el testimonio");

      setSent(true);
      setForm({ name: "", location: "", text: "" });
      removePhoto();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar. Por favor intentá de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="w-12 h-px bg-soft-gold" />
        <p className="font-serif text-2xl text-dark">¡Muchas gracias!</p>
        <p className="font-sans text-sm text-taupe max-w-sm">
          Tu testimonio fue recibido y lo publicaremos pronto. Significa muchísimo para nosotras.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 font-sans text-xs tracking-[0.3em] text-soft-gold uppercase hover:text-dark transition-colors duration-300"
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="t-name"
            className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
          >
            Tu nombre <span className="text-soft-gold">*</span>
          </label>
          <input
            id="t-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300"
            placeholder="María González"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="t-location"
            className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
          >
            Ciudad / País
          </label>
          <input
            id="t-location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300"
            placeholder="Playa del Carmen, México"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="t-text"
          className="font-sans text-xs tracking-[0.3em] text-taupe uppercase"
        >
          Tu testimonio <span className="text-soft-gold">*</span>
        </label>
        <textarea
          id="t-text"
          name="text"
          required
          rows={5}
          value={form.text}
          onChange={handleChange}
          className="border border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-dark placeholder-taupe/40 focus:outline-none focus:border-soft-gold transition-colors duration-300 resize-none"
          placeholder="Cuéntanos tu experiencia con ELUNÈ..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs tracking-[0.3em] text-taupe uppercase">
          Foto (opcional)
        </label>

        {photoPreview ? (
          <div className="relative inline-flex items-start gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-soft-gold/30">
              <Image
                src={photoPreview}
                alt="Vista previa"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={removePhoto}
              className="p-1 text-taupe/50 hover:text-red-400 transition-colors duration-200"
              aria-label="Eliminar foto"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 border border-dashed border-warm-beige bg-cream px-4 py-3 font-sans text-sm text-taupe/60 hover:text-taupe hover:border-soft-gold/40 transition-colors duration-300 self-start"
          >
            <Upload size={14} strokeWidth={1.5} />
            Subir una foto tuya
          </button>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          className="hidden"
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="inline-flex items-center justify-center gap-2.5 bg-dark text-cream font-sans text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-soft-gold transition-colors duration-500 self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={14} strokeWidth={2} />
        {uploading ? "Enviando..." : "Enviar testimonio"}
      </button>
    </form>
  );
}
