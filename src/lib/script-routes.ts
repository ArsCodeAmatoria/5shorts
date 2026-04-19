import type { Locale } from "@/i18n/config"

export const SCRIPT_SLUGS = [
  "the-10th-door",
  "the-silent-room",
  "ascent",
  "transfer",
  "deep-pockets",
] as const

export type ScriptSlug = (typeof SCRIPT_SLUGS)[number]

export function isScriptSlug(s: string): s is ScriptSlug {
  return (SCRIPT_SLUGS as readonly string[]).includes(s)
}

const titles: Record<ScriptSlug, string> = {
  "the-10th-door": "The 10th Door",
  "the-silent-room": "The Silent Room",
  ascent: "Ascent",
  transfer: "Transfer",
  "deep-pockets": "Deep Pockets",
}

export function scriptTitle(slug: ScriptSlug): string {
  return titles[slug]
}

/** Page and metadata title; film titles often stay in English on the French site. */
const titlesByLocale: Record<ScriptSlug, Record<Locale, string>> = {
  "the-10th-door": { en: "The 10th Door", fr: "The 10th Door" },
  "the-silent-room": { en: "The Silent Room", fr: "The Silent Room" },
  ascent: { en: "Ascent", fr: "Ascent" },
  transfer: { en: "Transfer", fr: "Transfer" },
  "deep-pockets": { en: "Deep Pockets", fr: "Deep Pockets" },
}

export function scriptDisplayTitle(slug: ScriptSlug, locale: Locale): string {
  return titlesByLocale[slug][locale] ?? titles[slug]
}
