import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";

const SKIP_PREFIXES = ["/_next", "/api", "/static", "/icons", "/favicon.ico", "/serwist/", "/sitemap.xml", "/robots.txt", "/manifest.webmanifest"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, APIs, and service worker
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check if the pathname already has a valid locale prefix
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  if (firstSegment && isValidLocale(firstSegment)) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  let detectedLocale = defaultLocale;
  const nonDefaultLocales = locales.filter((l) => l !== defaultLocale);
  for (const locale of nonDefaultLocales) {
    if (acceptLanguage.toLowerCase().includes(locale)) {
      detectedLocale = locale;
      break;
    }
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|static|icons|favicon\\.ico|serwist|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest).*)"],
};
