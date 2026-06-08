"use client";

import { useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import type { OptionGroup, OptionChoice, Product } from "@/lib/types";

const ic =
  "w-full border border-warm-beige bg-white px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-soft-gold transition-colors duration-200";
const lc = "text-[10px] tracking-[0.25em] text-taupe uppercase block mb-1.5";
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const addBtn =
  "inline-flex items-center gap-1.5 border border-warm-beige px-3 py-2 text-xs text-taupe hover:border-soft-gold hover:text-dark transition-colors duration-200";

type Fields = Partial<Pick<Product, "price" | "includes" | "options" | "artisanalNote">>;

interface Props {
  price: number | undefined;
  includes: string[];
  options: OptionGroup[];
  artisanalNote: string;
  onChange: (fields: Fields) => void;
}

function uid() {
  return crypto.randomUUID().slice(0, 8);
}

export default function ProductCustomizationEditor({
  price,
  includes,
  options,
  artisanalNote,
  onChange,
}: Props) {
  const [newInclude, setNewInclude] = useState("");
  const [newGroupLabel, setNewGroupLabel] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // ─── Includes ─────────────────────────────────────────────────────────────
  const addInclude = () => {
    const t = newInclude.trim();
    if (!t) return;
    onChange({ includes: [...includes, t] });
    setNewInclude("");
  };

  const removeInclude = (i: number) =>
    onChange({ includes: includes.filter((_, j) => j !== i) });

  const moveInclude = (i: number, dir: -1 | 1) => {
    const next = [...includes];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange({ includes: next });
  };

  // ─── Groups ───────────────────────────────────────────────────────────────
  const addGroup = () => {
    const label = newGroupLabel.trim();
    if (!label) return;
    const g: OptionGroup = {
      id: uid(),
      label,
      type: "single-select",
      required: true,
      choices: [],
    };
    onChange({ options: [...options, g] });
    setNewGroupLabel("");
    setExpanded((s) => new Set([...s, g.id]));
  };

  const removeGroup = (gid: string) =>
    onChange({ options: options.filter((g) => g.id !== gid) });

  const moveGroup = (i: number, dir: -1 | 1) => {
    const next = [...options];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange({ options: next });
  };

  const patchGroup = (gid: string, patch: Partial<OptionGroup>) =>
    onChange({
      options: options.map((g) => (g.id === gid ? { ...g, ...patch } : g)),
    });

  const toggleExpand = (gid: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(gid) ? n.delete(gid) : n.add(gid);
      return n;
    });

  // ─── Choices ──────────────────────────────────────────────────────────────
  const addChoice = (gid: string) => {
    const g = options.find((g) => g.id === gid)!;
    patchGroup(gid, { choices: [...g.choices, { id: uid(), label: "" }] });
  };

  const removeChoice = (gid: string, cid: string) => {
    const g = options.find((g) => g.id === gid)!;
    patchGroup(gid, { choices: g.choices.filter((c) => c.id !== cid) });
  };

  const patchChoice = (gid: string, cid: string, patch: Partial<OptionChoice>) => {
    const g = options.find((g) => g.id === gid)!;
    patchGroup(gid, {
      choices: g.choices.map((c) => (c.id === cid ? { ...c, ...patch } : c)),
    });
  };

  const moveChoice = (gid: string, i: number, dir: -1 | 1) => {
    const g = options.find((g) => g.id === gid)!;
    const next = [...g.choices];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    patchGroup(gid, { choices: next });
  };

  return (
    <div className="space-y-8" style={sans}>
      <div className="border-t border-warm-beige pt-6">
        <h2 className="text-2xl text-dark mb-6" style={serif}>
          Contenido y personalización
        </h2>
      </div>

      {/* ── Precio ── */}
      <div>
        <label className={lc}>Precio (MXN)</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-taupe">$</span>
          <input
            type="number"
            min="0"
            step="1"
            value={price ?? ""}
            onChange={(e) =>
              onChange({
                price: e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
            placeholder="179"
            className={`${ic} w-40`}
          />
          <span className="text-sm text-taupe">MXN</span>
        </div>
        <p className="text-[11px] text-taupe/60 mt-1.5">
          Se incluye en el mensaje de WhatsApp al pedir.
        </p>
      </div>

      {/* ── Incluye ── */}
      <div>
        <label className={lc}>Incluye</label>
        <p className="text-xs text-taupe mb-3">
          Artículos que vienen dentro del producto o caja.
        </p>
        <div className="space-y-1.5 mb-3">
          {includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col shrink-0">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => moveInclude(i, -1)}
                  className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  type="button"
                  disabled={i === includes.length - 1}
                  onClick={() => moveInclude(i, 1)}
                  className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
              <span className="flex-1 text-sm text-dark border border-warm-beige bg-white px-3 py-2">
                {item}
              </span>
              <button
                type="button"
                onClick={() => removeInclude(i)}
                className="text-taupe hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInclude}
            onChange={(e) => setNewInclude(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addInclude())
            }
            placeholder="Ej. Jabón artesanal"
            className={`${ic} flex-1`}
          />
          <button type="button" onClick={addInclude} className={addBtn}>
            <Plus size={12} /> Agregar
          </button>
        </div>
      </div>

      {/* ── Grupos de opción ── */}
      <div>
        <label className={lc}>Opciones de personalización</label>
        <p className="text-xs text-taupe mb-3">
          Grupos de elección que el cliente completa antes de hacer su pedido.
        </p>

        <div className="space-y-3 mb-4">
          {options.map((group, gi) => (
            <div key={group.id} className="border border-warm-beige">
              {/* Group header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FAF7F3]">
                <div className="flex flex-col shrink-0">
                  <button
                    type="button"
                    disabled={gi === 0}
                    onClick={() => moveGroup(gi, -1)}
                    className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    type="button"
                    disabled={gi === options.length - 1}
                    onClick={() => moveGroup(gi, 1)}
                    className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
                <input
                  type="text"
                  value={group.label}
                  onChange={(e) => patchGroup(group.id, { label: e.target.value })}
                  placeholder="Nombre del grupo"
                  className="flex-1 min-w-0 text-sm text-dark bg-transparent border-0 focus:outline-none"
                />
                <label className="flex items-center gap-1.5 text-[11px] text-taupe cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={group.required}
                    onChange={(e) => patchGroup(group.id, { required: e.target.checked })}
                    className="accent-soft-gold"
                  />
                  Obligatorio
                </label>
                <button
                  type="button"
                  onClick={() => toggleExpand(group.id)}
                  className="text-[11px] text-taupe hover:text-dark underline transition-colors shrink-0"
                >
                  {expanded.has(group.id)
                    ? "Ocultar"
                    : `${group.choices.length} opción(es)`}
                </button>
                <button
                  type="button"
                  onClick={() => removeGroup(group.id)}
                  className="text-taupe hover:text-red-400 transition-colors shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Choices */}
              {expanded.has(group.id) && (
                <div className="p-3 space-y-2 border-t border-warm-beige">
                  {group.choices.map((choice, ci) => (
                    <div key={choice.id} className="flex items-start gap-2">
                      <div className="flex flex-col shrink-0 mt-2.5">
                        <button
                          type="button"
                          disabled={ci === 0}
                          onClick={() => moveChoice(group.id, ci, -1)}
                          className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                        >
                          <ChevronUp size={11} />
                        </button>
                        <button
                          type="button"
                          disabled={ci === group.choices.length - 1}
                          onClick={() => moveChoice(group.id, ci, 1)}
                          className="text-taupe hover:text-dark disabled:opacity-20 transition-colors"
                        >
                          <ChevronDown size={11} />
                        </button>
                      </div>

                      {/* Swatch toggle */}
                      <div className="shrink-0 flex items-start gap-1 mt-1.5">
                        {choice.swatch !== undefined ? (
                          <>
                            <input
                              type="color"
                              value={choice.swatch}
                              onChange={(e) =>
                                patchChoice(group.id, choice.id, { swatch: e.target.value })
                              }
                              className="w-7 h-7 border border-warm-beige cursor-pointer rounded-none"
                              title="Color swatch"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                patchChoice(group.id, choice.id, { swatch: undefined })
                              }
                              className="text-[10px] text-taupe hover:text-red-400 leading-none mt-1.5"
                              title="Quitar color"
                            >
                              −
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              patchChoice(group.id, choice.id, { swatch: "#C7AA7A" })
                            }
                            className="text-[10px] text-taupe hover:text-dark border border-dashed border-warm-beige px-1.5 py-1 leading-none mt-0.5"
                            title="Agregar color"
                          >
                            +color
                          </button>
                        )}
                      </div>

                      {/* Label + note */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <input
                          type="text"
                          value={choice.label}
                          onChange={(e) =>
                            patchChoice(group.id, choice.id, { label: e.target.value })
                          }
                          placeholder="Etiqueta (ej. Rosa)"
                          className={ic}
                        />
                        <input
                          type="text"
                          value={choice.note ?? ""}
                          onChange={(e) =>
                            patchChoice(group.id, choice.id, {
                              note: e.target.value || undefined,
                            })
                          }
                          placeholder="Nota (opcional)"
                          className={`${ic} py-1.5 text-xs`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeChoice(group.id, choice.id)}
                        className="text-taupe hover:text-red-400 transition-colors mt-2.5 shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addChoice(group.id)}
                    className="flex items-center gap-1 text-xs text-taupe hover:text-dark transition-colors mt-2"
                  >
                    <Plus size={12} /> Agregar opción
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newGroupLabel}
            onChange={(e) => setNewGroupLabel(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addGroup())
            }
            placeholder="Ej. Color predominante"
            className={`${ic} flex-1`}
          />
          <button type="button" onClick={addGroup} className={addBtn}>
            <Plus size={12} /> Agregar grupo
          </button>
        </div>
      </div>

      {/* ── Nota artesanal ── */}
      <div>
        <label className={lc}>Nota artesanal (opcional)</label>
        <textarea
          value={artisanalNote}
          onChange={(e) => onChange({ artisanalNote: e.target.value || undefined })}
          rows={3}
          placeholder="Ej. Cada box se arma artesanalmente. Los colores pueden variar ligeramente..."
          className={`${ic} resize-none`}
        />
        <p className="text-[11px] text-taupe/60 mt-1.5">
          Se muestra en la página de detalle del producto.
        </p>
      </div>
    </div>
  );
}
