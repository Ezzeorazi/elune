import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  await saveSettings(body);
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
