import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/types";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = getProducts().find((p) => p.id === id);
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as Product;
  const products = getProducts().map((p) => (p.id === id ? body : p));
  saveProducts(products.sort((a, b) => a.order - b.order));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  saveProducts(getProducts().filter((p) => p.id !== id));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
