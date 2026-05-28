import fs from "fs";
import path from "path";
import type { Settings, Product, Post } from "./types";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  return JSON.parse(
    fs.readFileSync(path.join(dataDir, filename), "utf-8")
  ) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  fs.writeFileSync(
    path.join(dataDir, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export const getSettings = (): Settings => readJSON<Settings>("settings.json");
export const getProducts = (): Product[] => readJSON<Product[]>("products.json");
export const getPosts = (): Post[] => readJSON<Post[]>("posts.json");
export const getPost = (slug: string): Post | undefined =>
  getPosts().find((p) => p.slug === slug);
export const getProduct = (id: string): Product | undefined =>
  getProducts().find((p) => p.id === id);

export const saveSettings = (s: Settings): void =>
  writeJSON("settings.json", s);
export const saveProducts = (p: Product[]): void =>
  writeJSON("products.json", p);
export const savePosts = (p: Post[]): void => writeJSON("posts.json", p);
