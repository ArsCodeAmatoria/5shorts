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
