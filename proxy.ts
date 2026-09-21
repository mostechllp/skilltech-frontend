import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  // Match /ar and /ar/... paths
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const nextLocale = 'ar';
    const newPathname = pathname === '/ar' ? '/' : pathname.replace(/^\/ar/, '');

    requestHeaders.set('x-locale', nextLocale);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Default to English
  requestHeaders.set('x-locale', 'en');
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set('language', 'en', { path: '/' });
  return response;
}

export const config = {
  // Intercept all route paths except static assets, api, robots, sitemap, favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};
