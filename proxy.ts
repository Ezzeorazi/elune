import { NextRequest, NextResponse } from "next/server";

const COOKIE = "elune_admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  const secret = process.env.ADMIN_SECRET ?? "elune2025";

  if (token !== secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

