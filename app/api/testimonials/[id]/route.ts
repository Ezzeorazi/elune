import { NextRequest, NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  await updateTestimonial(id, body);
  revalidatePath("/");
  revalidatePath("/testimonios");
  revalidatePath("/admin/testimonials");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/testimonios");
  revalidatePath("/admin/testimonials");
  return NextResponse.json({ ok: true });
}
