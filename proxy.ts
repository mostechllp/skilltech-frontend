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
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Match /hi and /hi/... paths
  if (pathname === '/hi' || pathname.startsWith('/hi/')) {
    const nextLocale = 'hi';
    const newPathname = pathname === '/hi' ? '/' : pathname.replace(/^\/hi/, '');

    requestHeaders.set('x-locale', nextLocale);
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Match /es and /es/... paths
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const nextLocale = 'es';
    const newPathname = pathname === '/es' ? '/' : pathname.replace(/^\/es/, '');

    requestHeaders.set('x-locale', nextLocale);
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Match /pt and /pt/... paths
  if (pathname === '/pt' || pathname.startsWith('/pt/')) {
    const nextLocale = 'pt';
    const newPathname = pathname === '/pt' ? '/' : pathname.replace(/^\/pt/, '');

    requestHeaders.set('x-locale', nextLocale);
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Match /fr and /fr/... paths
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const nextLocale = 'fr';
    const newPathname = pathname === '/fr' ? '/' : pathname.replace(/^\/fr/, '');

    requestHeaders.set('x-locale', nextLocale);
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Match /ru and /ru/... paths
  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    const nextLocale = 'ru';
    const newPathname = pathname === '/ru' ? '/' : pathname.replace(/^\/ru/, '');

    requestHeaders.set('x-locale', nextLocale);
    requestHeaders.set('x-url-pathname', pathname);
    
    const response = NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    
    response.cookies.set('language', nextLocale, { path: '/' });
    return response;
  }

  // Non-prefixed paths are always English
  requestHeaders.set('x-locale', 'en');
  requestHeaders.set('x-url-pathname', pathname);
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set('language', 'en', { path: '/' });
  return response;
}

export const middleware = proxy;
export default proxy;

export const config = {
  // Intercept all route paths except static assets, api, robots, sitemap, favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};
