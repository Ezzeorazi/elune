"use client";

import { useState } from "react";
import type { Product, OptionGroup } from "@/lib/types";

interface Props {
  product: Product;
  whatsappNumber: string;
}

export default function ProductCustomizer({ product, whatsappNumber }: Props) {
  const groups: OptionGroup[] = product.options ?? [];
  const [selections, setSelections] = useState<Record<string, string>>({});

  const requiredGroups = groups.filter((g) => g.required);
  const allRequiredSelected = requiredGroups.every((g) => selections[g.id]);

  const select = (groupId: string, choiceId: string) =>
    setSelections((s) => ({ ...s, [groupId]: choiceId }));

  const buildMessage = () => {
    const lines: string[] = [];
    lines.push(`Hola ELUNÈ, me gustaría hacer un pedido 🌸`);
    lines.push(``);
    lines.push(`*${product.name}*`);
    if (product.price) {
      lines.push(`Precio: $${product.price} MXN`);
    }
    if (groups.length > 0) {
      lines.push(``);
      lines.push(`Mis elecciones:`);
      for (const group of groups) {
        const choiceId = selections[group.id];
        if (choiceId) {
          const choice = group.choices.find((c) => c.id === choiceId);
          if (choice) {
            lines.push(`• ${group.label}: ${choice.label}`);
          }
        }
      }
    }
    lines.push(``);
    lines.push(`¡Gracias!`);
    return lines.join("\n");
  };

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage())}`;

  return (
    <div className="space-y-8">
      {/* Option groups */}
      {groups.map((group) => {
        const hasSwatches = group.choices.some((c) => c.swatch);
        return (
          <div key={group.id}>
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="font-sans text-[11px] tracking-[0.3em] text-taupe uppercase">
                {group.label}
              </h3>
              {group.required && (
                <span className="font-sans text-[10px] text-soft-gold">*</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {group.choices.map((choice) => {
                const selected = selections[group.id] === choice.id;

                if (hasSwatches && choice.swatch) {
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => select(group.id, choice.id)}
                      title={choice.label}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selected
                          ? "border-dark scale-110 shadow-md"
                          : "border-warm-beige hover:border-taupe"
                      }`}
                      style={{ backgroundColor: choice.swatch }}
                    >
                      {selected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white/80 shadow-sm" />
                        </span>
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => select(group.id, choice.id)}
                    className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors duration-200 ${
                      selected
                        ? "bg-dark text-cream border-dark"
                        : "bg-white text-taupe border-warm-beige hover:border-taupe hover:text-dark"
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>

            {/* Show selected label for swatch groups */}
            {hasSwatches && selections[group.id] && (
              <p className="mt-2 font-sans text-xs text-taupe">
                {group.choices.find((c) => c.id === selections[group.id])?.label}
              </p>
            )}

            {/* Choice note */}
            {selections[group.id] && (() => {
              const note = group.choices.find((c) => c.id === selections[group.id])?.note;
              return note ? (
                <p className="mt-1 font-sans text-[11px] text-taupe/70 italic">{note}</p>
              ) : null;
            })()}
          </div>
        );
      })}

      {/* Required field hint */}
      {requiredGroups.length > 0 && (
        <p className="font-sans text-[11px] text-taupe/60">
          * Campo obligatorio para continuar con el pedido.
        </p>
      )}

      {/* WhatsApp CTA */}
      <div className="pt-2">
        <a
          href={allRequiredSelected ? waUrl : undefined}
          aria-disabled={!allRequiredSelected}
          className={`flex items-center justify-center gap-3 w-full py-4 font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
            allRequiredSelected
              ? "bg-dark text-cream hover:bg-soft-gold cursor-pointer"
              : "bg-warm-beige text-taupe/50 cursor-not-allowed pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.856L.057 23.882l6.162-1.616A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.638-.49-5.165-1.349l-.371-.22-3.838 1.006 1.023-3.73-.242-.384A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Pedir por WhatsApp
        </a>

        {!allRequiredSelected && requiredGroups.length > 0 && (
          <p className="mt-2 font-sans text-[11px] text-center text-taupe/60">
            Selecciona todas las opciones obligatorias para continuar.
          </p>
        )}
      </div>
    </div>
  );
}
