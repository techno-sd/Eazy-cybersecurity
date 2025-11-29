import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'ar'] as const;

// XSS attack patterns to detect and block
const XSS_PATTERNS = [
  /javascript\s*:/i,
  /vbscript\s*:/i,
  /data\s*:\s*text\/html/i,
  /<\s*script\b/i,
  /on(load|error|click|mouse|focus|blur|key|submit|change|input|drag|drop|copy|paste|cut)\s*=/i,
  /expression\s*\(/i,
  /eval\s*\(/i,
  /<\s*iframe/i,
  /<\s*object/i,
  /<\s*embed/i,
  /<\s*svg[^>]*on\w+\s*=/i,
  /<\s*img[^>]*on\w+\s*=/i,
  /<\s*body[^>]*on\w+\s*=/i,
  /\balert\s*\(/i,
  /\bconfirm\s*\(/i,
  /\bprompt\s*\(/i,
  /document\s*\.\s*(cookie|location|write)/i,
  /window\s*\.\s*location/i,
];

/**
 * Check if a string contains potential XSS attack patterns
 */
function containsXSS(value: string): boolean {
  try {
    // Decode URL encoding
    let decoded = decodeURIComponent(value);
    // Also decode HTML entities for common attack vectors
    decoded = decoded
      .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    return XSS_PATTERNS.some(pattern => pattern.test(decoded));
  } catch {
    // If decoding fails, check the raw value
    return XSS_PATTERNS.some(pattern => pattern.test(value));
  }
}

/**
 * Validate all URL search parameters for XSS attacks
 */
function validateSearchParams(searchParams: URLSearchParams): { safe: boolean; maliciousParam?: string } {
  for (const [key, value] of searchParams.entries()) {
    if (containsXSS(key) || containsXSS(value)) {
      return { safe: false, maliciousParam: key };
    }
  }
  return { safe: true };
}

function getLocaleFromPath(pathname: string): typeof locales[number] | null {
  const m = pathname.match(/^\/(en|ar)(?:\b|\/)/);
  return (m?.[1] as any) ?? null;
}

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
}

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname, searchParams } = nextUrl;

  // XSS Protection: Validate all query parameters
  const validation = validateSearchParams(searchParams);
  if (!validation.safe) {
    // Return 400 Bad Request for detected XSS attempts
    return new NextResponse('Bad Request: Invalid characters in request', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
      },
    });
  }

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

  // No locale in path: choose from cookie or Accept-Language (default: Arabic)
  const cookieLang = cookies.get('lang')?.value;
  let locale: 'en' | 'ar' = cookieLang === 'en' ? 'en' : 'ar';

  if (!cookieLang) {
    // Simple Accept-Language sniff (default to Arabic if not English)
    const accept = req.headers.get('accept-language') || '';
    if (/\ben\b/i.test(accept) && !/\bar\b/i.test(accept)) locale = 'en';
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
