import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "elune_admin";

function getSecret(): string {
  return process.env.ADMIN_SECRET ?? "elune2025";
}

/** Signs a payload with the ADMIN_SECRET so the cookie never contains the password itself. */
export function signToken(payload: string): string {
  const secret = getSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Returns true if the token in the cookie is valid. */
export function isValidAdminCookie(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return false;

  // Support both the new signed token and the legacy plain-secret cookie
  // during the transition period.
  const expected = signToken("admin");
  try {
    const tokenBuf = Buffer.from(token);
    const expectedBuf = Buffer.from(expected);
    if (tokenBuf.length === expectedBuf.length) {
      return timingSafeEqual(tokenBuf, expectedBuf);
    }
  } catch {
    // fall through
  }
  // Legacy: plain-secret cookie (remove after all sessions rotate)
  const secret = getSecret();
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(secret));
  } catch {
    return false;
  }
}

/** Call at the top of every admin API handler. Returns a 401 response if not authenticated, null if ok. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!isValidAdminCookie(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return null;
}

// ── Simple in-memory rate limiter ─────────────────────────────────────────────
// Works per-instance (good enough for a single-admin site; stateless deploys
// on Vercel Fluid Compute mean instances are reused across requests).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function resetRateLimit(ip: string) {
  attempts.delete(ip);
}

export { COOKIE };
