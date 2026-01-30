import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Routes that require any authenticated user
const privateRoutes = ["/dashboard", "/booking", "/demo"];

// Routes that require admin role only
const adminRoutes = ["/dashboard/users", "/dashboard/services"];

// Auth routes (login, register) - logged in users shouldn't access
const authRoutes = ["/login", "/register"];

export async function proxy(req) {
  console.log("proxy req ", req);
  const token = await getToken({ req });

  //get the user's desired path
  const { pathname } = req.nextUrl;

  //checking if the user is authenticated by converting token into a boolean value
  const isAuthenticated = Boolean(token);
  const userRole = token?.role; // "admin" | "user"

  // ==========================================
  // 1. Auth Routes - redirect logged in users
  // ==========================================

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ==========================================
  // 2. Private Routes - must be logged in
  // ==========================================
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ==========================================
  // 3. Admin Routes - must be admin
  // ==========================================
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== "admin") {
      // User is logged in but not admin → unauthorized page
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

// ==========================================
// Matcher Configuration
// ==========================================
export const config = {
  matcher: [
    "/demo/:path*",
    "/dashboard/:path*",
    "/booking/:path",
    "/login",
    "/register",
  ],
};
