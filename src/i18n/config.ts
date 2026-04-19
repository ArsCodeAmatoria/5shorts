export const locales = ["en", "fr"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const LOCALE_COOKIE = "atc_locale"

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "fr"
}
