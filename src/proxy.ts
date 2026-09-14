import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }

  return pathname;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const lng = searchParams.get("lng");

  if (
    lng &&
    routing.locales.includes(lng as (typeof routing.locales)[number])
  ) {
    const basePath = stripLocalePrefix(pathname);
    const destination = new URL(
      basePath === "/" ? `/${lng}` : `/${lng}${basePath}`,
      request.url,
    );

    searchParams.forEach((value, key) => {
      if (key !== "lng") {
        destination.searchParams.set(key, value);
      }
    });

    return NextResponse.redirect(destination, 301);
  }

  if (searchParams.get("lead") === "success") {
    const localeFromPath = routing.locales.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );
    const locale = localeFromPath ?? routing.defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}/thank-you`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(es|en|it|pt)/:path*",
    "/about",
    "/privacy",
    "/thank-you",
    "/nosotros",
    "/privacidad",
    "/gracias",
  ],
};
