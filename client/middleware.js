import { NextResponse } from 'next/server';

// <!-- Middleware -->
export default function middleware(request) {
  const path = request.nextUrl.pathname;

  const publicPath = path === '/login' || path === '/register' || path === '/verify/:path' || path === '/forget' || path === 'forget/:path*';

  const token = request.cookies.get('aToken');

  // <!-- Validation set -->
  if (publicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// <!-- configure router -->
export const config = {
  matcher: ['/login', '/register', '/verify/:path', '/forget', '/forget/:path*', '/', '/profile', '/friends', '/friends/:path*']
};
