import { NextRequest, NextResponse } from "next/server";
import { insertPresupuesto } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const presupuesto = await insertPresupuesto(body);
    return NextResponse.json({ id: presupuesto.id, numero: presupuesto.numero });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
