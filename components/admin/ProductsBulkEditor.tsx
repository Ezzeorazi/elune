"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Save, Trash2, ExternalLink, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";

const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

type Row = Product & { _key: string; _isNew?: boolean };

const cell =
  "w-full bg-transparent px-2.5 py-2 text-sm text-[#2C2825] focus:outline-none focus:bg-[#C7AA7A]/10 transition-colors duration-150";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let keyCounter = 0;
const newKey = () => `k${Date.now()}-${keyCounter++}`;

export default function ProductsBulkEditor({ initial }: { initial: Product[] }) {
  const [rows, setRows] = useState<Row[]>(() =>
    [...initial]
      .sort((a, b) => a.order - b.order)
      .map((p) => ({ ...p, _key: newKey() }))
  );
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [removed, setRemoved] = useState<string[]>([]); // ids to delete on save
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const markDirty = (key: string) =>
    setDirty((d) => (d.has(key) ? d : new Set(d).add(key)));

  const hasChanges = dirty.size > 0 || removed.length > 0;

  const update = <K extends keyof Product>(
    key: string,
    field: K,
    value: Product[K]
  ) => {
    setRows((rs) =>
      rs.map((r) => (r._key === key ? { ...r, [field]: value } : r))
    );
    markDirty(key);
    setMsg(null);
  };

  const addRow = () => {
    const nextOrder =
      rows.reduce((max, r) => Math.max(max, r.order), -1) + 1;
    const key = newKey();
    setRows((rs) => [
      ...rs,
      {
        _key: key,
        _isNew: true,
        id: "",
        name: "",
        description: "",
        tag: "",
        image: "",
        href: "/#contacto",
        bg: "#f5f0e8",
        order: nextOrder,
        published: false,
      },
    ]);
    markDirty(key);
  };

  const removeRow = (key: string) => {
    const row = rows.find((r) => r._key === key);
    if (!row) return;
    if (
      !row._isNew &&
      !confirm(`¿Eliminar "${row.name || row.id}"? Se borrará al guardar.`)
    )
      return;
    if (!row._isNew && row.id) setRemoved((x) => [...x, row.id]);
    setRows((rs) => rs.filter((r) => r._key !== key));
    setDirty((d) => {
      const n = new Set(d);
      n.delete(key);
      return n;
    });
  };

  const dirtyRows = useMemo(
    () => rows.filter((r) => dirty.has(r._key)),
    [rows, dirty]
  );

  const save = async () => {
    setError(null);
    setMsg(null);

    // Validate + normalize the rows we're about to write.
    const toSave: Product[] = [];
    const seenIds = new Set(rows.map((r) => r.id).filter(Boolean));
    for (const r of dirtyRows) {
      const name = r.name.trim();
      if (!name) {
        setError("Hay una fila sin nombre. Completala o eliminala.");
        return;
      }
      let id = r.id.trim() || slugify(name);
      if (r._isNew && rows.some((o) => o !== r && o.id.trim() === id)) {
        // ensure unique id for brand-new rows
        let n = 2;
        while (seenIds.has(`${id}-${n}`)) n++;
        id = `${id}-${n}`;
        seenIds.add(id);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _key, _isNew, ...product } = r;
      toSave.push({
        ...product,
        id,
        name,
        order: Number(r.order) || 0,
        price:
          r.price === undefined || (r.price as unknown) === ""
            ? undefined
            : Number(r.price),
      });
    }

    setSaving(true);
    try {
      if (toSave.length > 0) {
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toSave),
        });
        if (!res.ok) throw new Error("No se pudo guardar la planilla.");
      }
      for (const id of removed) {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
      }
      // Reflect saved ids/state locally and clear dirty flags.
      setRows((rs) =>
        rs.map((r) => {
          if (!dirty.has(r._key)) return r;
          const saved = toSave.find(
            (p) => p.name === r.name.trim() && p.order === (Number(r.order) || 0)
          );
          return saved ? { ...r, ...saved, _isNew: false } : { ...r, _isNew: false };
        })
      );
      setDirty(new Set());
      setRemoved([]);
      setMsg("Cambios guardados ✓");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 border border-[#DDD2C4] bg-white text-xs tracking-[0.15em] uppercase text-[#2C2825] px-4 py-2.5 hover:border-[#C7AA7A] hover:text-[#C7AA7A] transition-colors duration-200"
          style={sans}
        >
          <Plus size={13} /> Agregar fila
        </button>

        <div className="flex-1" />

        {hasChanges && (
          <span className="text-xs text-[#6F6963]" style={sans}>
            {dirty.size > 0 && `${dirty.size} sin guardar`}
            {dirty.size > 0 && removed.length > 0 && " · "}
            {removed.length > 0 && `${removed.length} para eliminar`}
          </span>
        )}
        {msg && (
          <span className="text-xs text-green-600" style={sans}>
            {msg}
          </span>
        )}
        {error && (
          <span className="text-xs text-red-500" style={sans}>
            {error}
          </span>
        )}

        <button
          onClick={save}
          disabled={!hasChanges || saving}
          className="inline-flex items-center gap-2 bg-[#2C2825] text-[#F5F1EB] text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#C7AA7A] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={sans}
        >
          <Save size={13} />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {/* Spreadsheet */}
      <div className="overflow-x-auto border border-[#DDD2C4] bg-white">
        <table className="w-full border-collapse min-w-[860px]">
          <thead>
            <tr className="bg-[#F5F1EB] text-left">
              {["Orden", "Nombre", "Etiqueta", "Precio (MXN)", "Estado", "Ficha", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="text-[10px] tracking-[0.2em] text-[#6F6963] uppercase font-medium px-2.5 py-3 border-b border-[#DDD2C4] whitespace-nowrap"
                    style={sans}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isDirty = dirty.has(r._key);
              return (
                <tr
                  key={r._key}
                  className={`border-b border-[#DDD2C4]/60 ${
                    isDirty ? "bg-[#C7AA7A]/5" : "hover:bg-[#F5F1EB]/50"
                  } transition-colors duration-150`}
                >
                  {/* Order */}
                  <td className="w-20 border-r border-[#DDD2C4]/40">
                    <input
                      type="number"
                      value={r.order}
                      onChange={(e) =>
                        update(r._key, "order", Number(e.target.value))
                      }
                      className={`${cell} text-center`}
                      style={sans}
                    />
                  </td>

                  {/* Name */}
                  <td className="border-r border-[#DDD2C4]/40">
                    <input
                      type="text"
                      value={r.name}
                      placeholder="Nombre del producto"
                      onChange={(e) => update(r._key, "name", e.target.value)}
                      className={cell}
                      style={serif}
                    />
                  </td>

                  {/* Tag */}
                  <td className="w-40 border-r border-[#DDD2C4]/40">
                    <input
                      type="text"
                      value={r.tag}
                      placeholder="—"
                      onChange={(e) => update(r._key, "tag", e.target.value)}
                      className={cell}
                      style={sans}
                    />
                  </td>

                  {/* Price */}
                  <td className="w-32 border-r border-[#DDD2C4]/40">
                    <input
                      type="number"
                      value={r.price ?? ""}
                      placeholder="—"
                      min={0}
                      onChange={(e) =>
                        update(
                          r._key,
                          "price",
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                      className={`${cell} text-right`}
                      style={sans}
                    />
                  </td>

                  {/* Published */}
                  <td className="w-28 border-r border-[#DDD2C4]/40 px-2.5">
                    <label
                      className="flex items-center gap-2 cursor-pointer text-xs"
                      style={sans}
                    >
                      <input
                        type="checkbox"
                        checked={r.published}
                        onChange={(e) =>
                          update(r._key, "published", e.target.checked)
                        }
                        className="w-4 h-4 accent-[#C7AA7A]"
                      />
                      <span
                        className={
                          r.published ? "text-green-600" : "text-[#6F6963]/50"
                        }
                      >
                        {r.published ? "Publicado" : "Borrador"}
                      </span>
                    </label>
                  </td>

                  {/* Ficha link */}
                  <td className="w-24 border-r border-[#DDD2C4]/40 px-2.5 text-center">
                    {r._isNew ? (
                      <span
                        className="text-[10px] text-[#6F6963]/40"
                        style={sans}
                      >
                        guardá primero
                      </span>
                    ) : (
                      <Link
                        href={`/admin/products/${r.id}`}
                        className="inline-flex items-center gap-1 text-xs text-[#6F6963] hover:text-[#C7AA7A] transition-colors duration-200"
                        style={sans}
                        title="Editar imagen, opciones y detalle"
                      >
                        <ExternalLink size={12} /> Detalle
                      </Link>
                    )}
                  </td>

                  {/* Delete */}
                  <td className="w-12 px-2.5 text-center">
                    <button
                      onClick={() => removeRow(r._key)}
                      className="text-[#6F6963]/40 hover:text-red-500 transition-colors duration-200"
                      title="Eliminar fila"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-[#6F6963]"
                  style={sans}
                >
                  No hay productos. Agregá la primera fila.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Help line */}
      <p className="text-[11px] text-[#6F6963]/70 mt-3 flex items-center gap-1.5" style={sans}>
        <RotateCcw size={11} />
        Editá las celdas y presioná <strong className="text-[#2C2825]">Guardar cambios</strong>. Para imagen, fondo y opciones de personalización, abrí el <strong className="text-[#2C2825]">Detalle</strong> de cada fila.
      </p>
    </div>
  );
}
