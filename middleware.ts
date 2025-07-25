import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

/**
 * Next.js middleware for handling authentication and route protection
 * Runs on every request to protected routes before page rendering
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Health check endpoint for testing infrastructure
  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Allow authentication routes to pass through without checks
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Verify user authentication token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  // Redirect unauthenticated users to guest authentication
  if (!token) {
    const redirectUrl = encodeURIComponent(request.url);

    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
    );
  }

  // Check if user is a guest user based on email pattern
  const isGuest = guestRegex.test(token?.email ?? '');

  // Redirect authenticated non-guest users away from auth pages
  if (token && !isGuest && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Middleware configuration specifying which routes should be processed
export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
