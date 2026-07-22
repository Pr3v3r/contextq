import { NextRequest, NextResponse } from "next/server";

// Keep this named 'proxy'!
export function proxy(req: NextRequest) {
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");
  
  // 1. Put all your public pages in this array
  const publicRoutes = ["/", "/terms", "/privacy", "/status", "/contact", "/about"];
  
  // 2. Check if the current path is in the array
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};