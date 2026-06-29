export const dynamic = "force-dynamic";

import Link from "next/link";
import { getPresupuestos, deletePresupuesto } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { Plus, FileText, Trash2, Eye } from "lucide-react";

export default async function PresupuestosPage() {
  let presupuestos: Awaited<ReturnType<typeof getPresupuestos>> = [];
  let fetchError: string | null = null;

  try {
    presupuestos = await getPresupuestos();
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e);
  }

  async function remove(id: string) {
    "use server";
    await deletePresupuesto(id);
    revalidatePath("/admin/presupuestos");
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl text-dark"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Presupuestos
          </h1>
          <p
            className="text-sm text-taupe mt-1"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            {presupuestos.length} presupuesto{presupuestos.length !== 1 ? "s" : ""} registrado{presupuestos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/presupuestos/nuevo"
          className="flex items-center gap-2 bg-dark text-cream text-xs tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-soft-gold transition-colors duration-200"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          <Plus size={14} />
          Nuevo
        </Link>
      </div>

      {fetchError && (
        <div className="mb-4 bg-red-50 border border-red-200 p-4 text-xs font-mono text-red-700">
          {fetchError}
        </div>
      )}

      {presupuestos.length === 0 && !fetchError ? (
        <div className="bg-white border border-warm-beige p-16 text-center">
          <FileText size={32} className="text-taupe/30 mx-auto mb-4" strokeWidth={1} />
          <p
            className="text-taupe text-sm"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Todavía no hay presupuestos.
          </p>
          <Link
            href="/admin/presupuestos/nuevo"
            className="inline-block mt-4 text-sm text-soft-gold hover:underline"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Crear el primero →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {presupuestos.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-warm-beige p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-soft-gold transition-colors duration-200"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className="text-2xl text-soft-gold shrink-0 w-10 text-right"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  #{p.numero}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-sm font-medium text-dark truncate"
                    style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                  >
                    {p.cliente_nombre}
                  </p>
                  <p
                    className="text-xs text-taupe/60 mt-0.5"
                    style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                  >
                    {new Date(p.created_at).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" · "}
                    {p.items.length} ítem{p.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span
                  className="text-sm font-medium text-dark hidden sm:block"
                  style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                >
                  ${p.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/presupuestos/${p.id}`}
                    className="p-2 text-taupe/50 hover:text-soft-gold transition-colors duration-200"
                    title="Ver / descargar PDF"
                  >
                    <Eye size={16} strokeWidth={1.5} />
                  </Link>
                  <form action={remove.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="p-2 text-taupe/50 hover:text-red-400 transition-colors duration-200"
                      title="Eliminar"
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
