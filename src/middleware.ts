import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "advocate_admin_session";

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET || "fallback-insecure-secret-for-development-only-min-32-chars";
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Set NoIndex header for all admin routes and API routes
  const response = NextResponse.next();
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }

  // Public admin routes that do not require authentication
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth/login"
  ) {
    return response;
  }

  // Check protected admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, getSecretKey());
      return response;
    } catch {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { error: "Invalid or expired session" },
          { status: 401, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
