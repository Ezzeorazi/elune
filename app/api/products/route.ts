import { NextRequest, NextResponse } from "next/server";
import { getProducts, insertProduct } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getProducts());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Product;
  await insertProduct(body);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
