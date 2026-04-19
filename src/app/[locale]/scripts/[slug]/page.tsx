import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ScreenplayView } from "@/components/screenplay/screenplay-view"
import { ascentScript } from "@/content/scripts/ascent"
import { deepPocketsScript } from "@/content/scripts/deep-pockets"
import { silentRoomScript } from "@/content/scripts/the-silent-room"
import { the10thDoorScript } from "@/content/scripts/the-10th-door"
import { transferScript } from "@/content/scripts/transfer"
import { isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import {
  ascentParseConfig,
  deepPocketsParseConfig,
  localizeParseConfig,
  silentRoomParseConfig,
  the10thDoorParseConfig,
  transferParseConfig,
  type ParseConfig,
} from "@/lib/screenplay/parse-screenplay"
import {
  isScriptSlug,
  scriptDisplayTitle,
  SCRIPT_SLUGS,
  type ScriptSlug,
} from "@/lib/script-routes"

const SCRIPT_MODULES: Record<
  ScriptSlug,
  {
    raw: Record<Locale, string>
    base: ParseConfig
  }
> = {
  "the-10th-door": { raw: the10thDoorScript, base: the10thDoorParseConfig },
  "the-silent-room": { raw: silentRoomScript, base: silentRoomParseConfig },
  ascent: { raw: ascentScript, base: ascentParseConfig },
  transfer: { raw: transferScript, base: transferParseConfig },
  "deep-pockets": { raw: deepPocketsScript, base: deepPocketsParseConfig },
}

export function generateStaticParams() {
  const locales = ["en", "fr"] as const
  return locales.flatMap((locale) =>
    SCRIPT_SLUGS.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw) || !isScriptSlug(slug)) return {}
  const dict = getDictionary(raw)
  const name = scriptDisplayTitle(slug, raw)
  return {
    title: `${name} — ${dict.nav.portfolio}`,
    description: dict.metadata.portfolioDescription,
  }
}

export default async function ScriptPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  if (!isScriptSlug(slug)) notFound()

  const dict = getDictionary(locale)
  const mod = SCRIPT_MODULES[slug]
  const acts = dict.scriptsActs[slug]
  const parseConfig = localizeParseConfig(mod.base, [acts.act1, acts.act2])

  return (
    <main id="main" className="flex-1">
      <ScreenplayView
        raw={mod.raw[locale]}
        locale={locale}
        title={scriptDisplayTitle(slug, locale)}
        parseConfig={parseConfig}
        scriptsPage={dict.scriptsPage}
      />
    </main>
  )
}
