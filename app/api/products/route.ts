import { NextRequest, NextResponse } from "next/server";
import { getProducts, insertProduct, upsertProducts } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getProducts());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Product;
  await insertProduct(body);
  revalidatePath("/");
  revalidatePath("/admin/products");
  return NextResponse.json({ ok: true });
}

/** Bulk save from the spreadsheet editor. Accepts an array of products. */
export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Product[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }
  await upsertProducts(body);
  revalidatePath("/");
  revalidatePath("/admin/products");
  for (const p of body) revalidatePath(`/producto/${p.id}`);
  return NextResponse.json({ ok: true });
}
