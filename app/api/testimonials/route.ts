import { NextRequest, NextResponse } from "next/server";
import { getPublishedTestimonials, insertTestimonial } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json(await getPublishedTestimonials());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, location, text, photo } = body as {
    name: string;
    location?: string;
    text: string;
    photo?: string;
  };

  if (!name?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "Nombre y testimonio son requeridos" }, { status: 400 });
  }

  await insertTestimonial({
    name: name.trim(),
    location: (location ?? "").trim(),
    text: text.trim(),
    photo: (photo ?? "").trim(),
    published: false,
  });

  revalidatePath("/testimonios");
  revalidatePath("/admin/testimonials");

  return NextResponse.json({ ok: true });
}
