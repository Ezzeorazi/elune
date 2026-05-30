import { supabase } from "./supabase";
import type { Settings, Product, Post, Contact } from "./types";

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();
  if (error) throw new Error(`getSettings: ${error.message}`);
  return {
    phone: data.phone ?? "",
    email: data.email ?? "",
    instagram: data.instagram ?? "",
    instagramUrl: data.instagram_url ?? "",
    whatsapp: data.whatsapp ?? "",
    facebook: data.facebook ?? "",
    facebookUrl: data.facebook_url ?? "",
    tiktok: data.tiktok ?? "",
    tiktokUrl: data.tiktok_url ?? "",
  };
}

export async function saveSettings(s: Settings): Promise<void> {
  const { error } = await supabase.from("settings").upsert({
    id: true,
    phone: s.phone,
    email: s.email,
    instagram: s.instagram,
    instagram_url: s.instagramUrl,
    whatsapp: s.whatsapp,
    facebook: s.facebook,
    facebook_url: s.facebookUrl,
    tiktok: s.tiktok,
    tiktok_url: s.tiktokUrl,
  });
  if (error) throw new Error(`saveSettings: ${error.message}`);
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`getProducts: ${error.message}`);
  return data as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getProduct: ${error.message}`);
  return data ?? undefined;
}

export async function insertProduct(p: Product): Promise<void> {
  const { error } = await supabase.from("products").insert(p);
  if (error) throw new Error(`insertProduct: ${error.message}`);
}

export async function updateProduct(id: string, p: Product): Promise<void> {
  const { error } = await supabase.from("products").update(p).eq("id", id);
  if (error) throw new Error(`updateProduct: ${error.message}`);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(`deleteProduct: ${error.message}`);
}

// ─── Posts ────────────────────────────────────────────────────────────────────

function rowToPost(row: Record<string, unknown>): Post {
  return {
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    date: row.date as string,
    readTime: row.read_time as string,
    excerpt: row.excerpt as string,
    image: row.image as string,
    bg: row.bg as string,
    content: row.content as string,
    published: row.published as boolean,
  };
}

function postToRow(p: Post) {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    read_time: p.readTime,
    excerpt: p.excerpt,
    image: p.image,
    bg: p.bg,
    content: p.content,
    published: p.published,
  };
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*");
  if (error) throw new Error(`getPosts: ${error.message}`);
  return (data as Record<string, unknown>[]).map(rowToPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getPost: ${error.message}`);
  return data ? rowToPost(data as Record<string, unknown>) : undefined;
}

export async function insertPost(p: Post): Promise<void> {
  const { error } = await supabase.from("posts").insert(postToRow(p));
  if (error) throw new Error(`insertPost: ${error.message}`);
}

export async function updatePost(slug: string, p: Post): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .update(postToRow(p))
    .eq("slug", slug);
  if (error) throw new Error(`updatePost: ${error.message}`);
}

export async function deletePost(slug: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("slug", slug);
  if (error) throw new Error(`deletePost: ${error.message}`);
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getContacts: ${error.message}`);
  return data as Contact[];
}

export async function insertContact(c: Omit<Contact, "id" | "read" | "created_at">): Promise<void> {
  const { error } = await supabase.from("contacts").insert(c);
  if (error) throw new Error(`insertContact: ${error.message}`);
}

export async function markContactRead(id: string): Promise<void> {
  const { error } = await supabase.from("contacts").update({ read: true }).eq("id", id);
  if (error) throw new Error(`markContactRead: ${error.message}`);
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) throw new Error(`deleteContact: ${error.message}`);
}
