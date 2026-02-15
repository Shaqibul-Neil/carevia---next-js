import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// ==========================================
// Origin--CORS
// ==========================================
const allowedOrigins = [process.env.DASHBOARD_URL];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

// ==========================================
// Public API Routes (no auth required)
// ==========================================
const publicRoutes = ["/api/login", "/api/register"];

// ==========================================
// Access Control List(ACL)-- Route config
// ==========================================
// Routes that require any authenticated user
const privateRoutes = ["/booking", "/demo"];
// Routes that require admin role only
const adminRoutes = [];
// Auth routes (login, register) - logged in users shouldn't access
const authRoutes = ["/login", "/register"];

export async function proxy(req) {
  //get the user's desired path
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin") ?? "";

  //now check if this origin is from our allowed domain
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // CORS Preflight(OPTIONS) request handling
  const isPreflight = req.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }
  // ==========================================
  //  Allow public API routes without authentication
  // ==========================================
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isPublicRoute) {
    //Skip authentication, just set CORS Headers
    let response = NextResponse.next();
    //Setting up CORS header for all responses so that react app can receive the data
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    //Setting up headers in all object
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    console.log(`✅ Public API access: ${pathname}`);
    return response;
  }
  // ==========================================
  //  Get token and Identity Check (Protected Route)
  // ==========================================

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //checking if the user is authenticated by converting token into a boolean value
  const isAuthenticated = Boolean(token);
  const userRole = token?.role; // "admin" | "user"
  //To use it in the Header, take response in the variable
  let response = NextResponse.next();

  // 1. Auth Routes - redirect logged in users
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Private Routes - must be logged in
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Admin Routes - must be admin
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

  //Setting up CORS header for all responses so that react app can receive the data
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  //Setting up headers in all object
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
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
    "/api/:path*",
  ],
};
