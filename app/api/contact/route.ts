import { NextRequest, NextResponse } from "next/server";
import { insertContact } from "@/lib/data";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  await insertContact({ name, email, subject, message });
  return NextResponse.json({ ok: true });
}
