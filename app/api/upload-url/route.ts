import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const authErr = requireAdmin(request);
  if (authErr) return authErr;

  const { filename } = await request.json();
  const ext = (filename as string).split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("uploads")
    .createSignedUploadUrl(path);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from("uploads")
    .getPublicUrl(path);

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl });
}
