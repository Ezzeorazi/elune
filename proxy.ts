import { NextRequest, NextResponse } from "next/server";
import { isValidAdminCookie } from "@/lib/adminAuth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public admin routes that don't need auth
  if (pathname === "/admin/login") return NextResponse.next();

  if (!isValidAdminCookie(request)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
