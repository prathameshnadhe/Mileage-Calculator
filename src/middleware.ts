import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === "/login" || path === "/signup";

  // Retrieve the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // If user is authenticated and visits a public path, redirect them to the profile page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is unauthenticated and visits a private path, redirect them to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to the requested path
  return NextResponse.next();
}

// Apply the middleware to the specified routes
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
