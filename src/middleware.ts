import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { INTRO_SEEN_COOKIE } from "@/lib/brand";

const COOKIE_NAME = "d1_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.length < 32) {
      return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (process.env.NEXT_PUBLIC_SKIP_INTRO === "true") {
    return NextResponse.next();
  }

  const introSeen = request.cookies.get(INTRO_SEEN_COOKIE)?.value === "1";
  const replay = request.nextUrl.searchParams.get("replay") === "1";

  const isHomeEntry = pathname === "/" || pathname === "";
  if (isHomeEntry && !introSeen) {
    return NextResponse.redirect(new URL("/intro", request.url));
  }

  if (pathname === "/intro" && introSeen && !replay) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/", "/intro"],
};
