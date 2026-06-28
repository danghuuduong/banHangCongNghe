import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('adminToken')?.value;
  const url = req.nextUrl.clone();

  // If trying to access any admin page without token, redirect to login
  if (!token && !url.pathname.startsWith('/admin/login')) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // If already logged in and accessing login page, go to dashboard
  if (token && url.pathname === '/admin/login') {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
