import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (pathname === '/login' || pathname === '/' || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  
  // For dashboard routes, let the client-side handle auth
  // (since we're using Zustand for state management)
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};