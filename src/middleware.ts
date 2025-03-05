import { NextRequest, NextResponse } from "next/server";
import { adminPagesMiddleware, authMiddleware, loggingMiddleware } from "./authMiddleware";

export default async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname === '/decadas') {
    return NextResponse.redirect(new URL('/decadas/1930', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    loggingMiddleware(request);
    const authResponse = authMiddleware(request);
    if (authResponse) {
      return authResponse;
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname === '/login') {
    const authResponse = adminPagesMiddleware(request);
    if (authResponse) {
      return authResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
    '/login',
    '/',
    '/decadas',
  ],
};