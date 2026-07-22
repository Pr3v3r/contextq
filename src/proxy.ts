import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");
  const isPublicRoute = 
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/terms";
  
  const sessionToken = 
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token");

  const isLoggedIn = !!sessionToken;

  if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};