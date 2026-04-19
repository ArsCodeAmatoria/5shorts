import type { Locale } from "@/i18n/config"

/** Binds EN (+ optional FR) screenplay text for `/en` and `/fr` script routes. */
export function scriptBundle(
  en: string,
  fr?: string
): Record<Locale, string> {
  return { en, fr: fr ?? en }
}
