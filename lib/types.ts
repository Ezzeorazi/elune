export interface Settings {
  phone: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  whatsapp: string;
  facebook: string;
  facebookUrl: string;
  tiktok: string;
  tiktokUrl: string;
}

export interface OptionChoice {
  id: string;
  label: string;
  swatch?: string;
  note?: string;
}

export interface OptionGroup {
  id: string;
  label: string;
  type: "single-select";
  required: boolean;
  choices: OptionChoice[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  tag: string;
  image: string;
  href: string;
  bg: string;
  order: number;
  published: boolean;
  price?: number;
  includes?: string[];
  options?: OptionGroup[];
  artisanalNote?: string;
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  bg: string;
  content: string;
  published: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  photo: string;
  published: boolean;
  created_at: string;
}

export interface PresupuestoItem {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface Presupuesto {
  id: string;
  numero: number;
  cliente_nombre: string;
  cliente_email: string;
  cliente_telefono: string;
  items: PresupuestoItem[];
  subtotal: number;
  iva_porcentaje: number | null;
  iva_monto: number | null;
  total: number;
  notas: string;
  created_at: string;
}
