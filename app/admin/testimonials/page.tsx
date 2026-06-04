export const dynamic = "force-dynamic";

import Image from "next/image";
import { getTestimonials, updateTestimonial, deleteTestimonial } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export default async function AdminTestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let fetchError: string | null = null;

  try {
    testimonials = await getTestimonials();
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  const pending = testimonials.filter((t) => !t.published).length;

  async function approve(id: string) {
    "use server";
    await updateTestimonial(id, { published: true });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/testimonios");
  }

  async function unpublish(id: string) {
    "use server";
    await updateTestimonial(id, { published: false });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/testimonios");
  }

  async function remove(id: string) {
    "use server";
    await deleteTestimonial(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    revalidatePath("/testimonios");
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1
          className="text-3xl text-dark"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Testimonios
        </h1>
        <p
          className="text-sm text-taupe mt-1"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          {testimonials.length} recibidos · {pending} pendientes de aprobación
        </p>
      </div>

      {fetchError && (
        <div className="mb-4 bg-red-50 border border-red-200 p-4 text-xs font-mono text-red-700">
          {fetchError}
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="bg-white border border-warm-beige p-12 text-center">
          <p
            className="text-taupe text-sm"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Todavía no hay testimonios.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`bg-white border p-6 ${
                t.published ? "border-warm-beige" : "border-soft-gold"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {t.photo ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-warm-beige shrink-0">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-warm-beige/60 flex items-center justify-center shrink-0">
                      <span
                        className="text-soft-gold text-lg"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      >
                        {t.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {!t.published ? (
                        <span
                          className="text-[9px] tracking-[0.3em] bg-soft-gold/20 text-soft-gold px-2 py-0.5 uppercase"
                          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                        >
                          Pendiente
                        </span>
                      ) : (
                        <span
                          className="text-[9px] tracking-[0.3em] bg-sage/20 text-sage-700 px-2 py-0.5 uppercase"
                          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                        >
                          Publicado
                        </span>
                      )}
                      <span
                        className="text-[10px] text-taupe/40"
                        style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                      >
                        {new Date(t.created_at).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p
                      className="text-base text-dark font-medium"
                      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                    >
                      {t.name}
                    </p>

                    {t.location && (
                      <p
                        className="text-xs text-taupe/60 tracking-wide"
                        style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                      >
                        {t.location}
                      </p>
                    )}

                    <p
                      className="text-sm text-taupe mt-2 leading-relaxed italic"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  {!t.published ? (
                    <form action={approve.bind(null, t.id)}>
                      <button
                        type="submit"
                        title="Aprobar y publicar"
                        className="p-2 text-taupe/50 hover:text-sage-600 transition-colors duration-200"
                      >
                        <CheckCircle size={16} strokeWidth={1.5} />
                      </button>
                    </form>
                  ) : (
                    <form action={unpublish.bind(null, t.id)}>
                      <button
                        type="submit"
                        title="Despublicar"
                        className="p-2 text-sage-600/60 hover:text-taupe transition-colors duration-200"
                      >
                        <XCircle size={16} strokeWidth={1.5} />
                      </button>
                    </form>
                  )}

                  <form action={remove.bind(null, t.id)}>
                    <button
                      type="submit"
                      title="Eliminar"
                      className="p-2 text-taupe/50 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
