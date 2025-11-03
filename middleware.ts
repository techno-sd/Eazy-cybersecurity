import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'ar'] as const;

function getLocaleFromPath(pathname: string): typeof locales[number] | null {
  const m = pathname.match(/^\/(en|ar)(?:\b|\/)/);
  return (m?.[1] as any) ?? null;
}

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
}

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname } = nextUrl;

  // Skip for public files and api
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const pathLocale = getLocaleFromPath(pathname);

  // If path already has locale, sync cookie and REWRITE to underlying route
  if (pathLocale) {
    const base = stripLocale(pathname);
    const url = req.nextUrl.clone();
    url.pathname = base;
    const res = NextResponse.rewrite(url);
    if (cookies.get('lang')?.value !== pathLocale) {
      res.cookies.set('lang', pathLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    }
    return res;
  }

  // No locale in path: choose from cookie or Accept-Language
  const cookieLang = cookies.get('lang')?.value;
  let locale: 'en' | 'ar' = cookieLang === 'ar' ? 'ar' : 'en';

  if (!cookieLang) {
    // Simple Accept-Language sniff
    const accept = req.headers.get('accept-language') || '';
    if (/\bar\b/i.test(accept)) locale = 'ar';
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const res = NextResponse.redirect(url);
  res.cookies.set('lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\..*).*)'],
};
