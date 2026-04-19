import type { Locale } from "./config"

/** Prefix a path with locale (`/` → `/en`, `/portfolio` → `/fr/portfolio`). */
export function withLocale(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (normalized === "/") return `/${locale}`
  return `/${locale}${normalized}`
}

/** Strip leading `/en` or `/fr` from a pathname; returns `/` for home. */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean)
  const first = parts[0]
  if (first === "en" || first === "fr") {
    const rest = parts.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`
}
