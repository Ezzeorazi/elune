import { NextRequest, NextResponse } from "next/server";
import { signToken, checkRateLimit, resetRateLimit, COOKIE } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfterMs } = checkRateLimit(ip);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 60000);
    return NextResponse.json(
      { error: `Demasiados intentos. Intentá de nuevo en ${minutes} minuto${minutes !== 1 ? "s" : ""}.` },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };
  const secret = process.env.ADMIN_SECRET ?? "elune2025";

  if (!password || password !== secret) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  // Success — clear rate limit and set a signed token (not the password itself)
  resetRateLimit(ip);
  const token = signToken("admin");

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return response;
}
