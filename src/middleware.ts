import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });

  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};