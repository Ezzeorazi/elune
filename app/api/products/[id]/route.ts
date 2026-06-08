import { NextRequest, NextResponse } from "next/server";
import { getProduct, updateProduct, deleteProduct } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/types";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await getProduct(id);
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
  await updateProduct(id, body);
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath(`/producto/${id}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/admin/products");
  return NextResponse.json({ ok: true });
}
