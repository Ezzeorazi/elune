import type { OptionGroup } from "./types";

export const DEFAULT_PRODUCT_OPTIONS: OptionGroup[] = [
  {
    id: "color-predominante",
    label: "Color predominante",
    type: "single-select",
    required: true,
    choices: [
      { id: "rosa", label: "Rosa", swatch: "#F4C2C2" },
      { id: "lila", label: "Lila", swatch: "#C8A2C8" },
      { id: "celeste", label: "Celeste", swatch: "#AEC6CF" },
      { id: "verde", label: "Verde", swatch: "#C1E1C1" },
      { id: "amarillo", label: "Amarillo", swatch: "#FDFD96" },
      { id: "sorpresa-elune", label: "Sorpresa Eluné", swatch: "#C7A36B" },
    ],
  },
  {
    id: "aroma-jabon",
    label: "Aroma del jabón",
    type: "single-select",
    required: true,
    choices: [
      { id: "rosas", label: "Rosas" },
      { id: "floral", label: "Floral" },
      { id: "fresas", label: "Fresas" },
      { id: "sorpresa-elune-aroma", label: "Sorpresa Eluné" },
    ],
  },
];
