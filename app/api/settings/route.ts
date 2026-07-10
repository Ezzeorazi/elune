import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: NextRequest) {
  const authErr = requireAdmin(request);
  if (authErr) return authErr;

  const body = await request.json();
  await saveSettings(body);
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
