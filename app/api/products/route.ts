import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Product;
  const products = getProducts();
  products.push(body);
  saveProducts(products.sort((a, b) => a.order - b.order));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
