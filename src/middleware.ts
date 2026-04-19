import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config"

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(cookie)) return cookie

  const accept = request.headers.get("accept-language") ?? ""
  if (/\bfr\b/i.test(accept)) return "fr"

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const first = pathname.split("/")[1]
  if (isLocale(first)) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, first, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
    return res
  }

  const locale = preferredLocale(request)
  const url = request.nextUrl.clone()
  const suffix = pathname === "/" ? "" : pathname
  url.pathname = `/${locale}${suffix}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
