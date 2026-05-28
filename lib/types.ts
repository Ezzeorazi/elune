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
