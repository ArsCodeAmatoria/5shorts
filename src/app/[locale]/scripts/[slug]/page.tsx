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
  silentRoomParseConfig,
  the10thDoorParseConfig,
  transferParseConfig,
} from "@/lib/screenplay/parse-screenplay"
import { isScriptSlug, scriptTitle, SCRIPT_SLUGS } from "@/lib/script-routes"

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
  const name = scriptTitle(slug)
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

  if (slug === "the-10th-door") {
    return (
      <main id="main" className="flex-1">
        <ScreenplayView
          raw={the10thDoorScript}
          locale={locale}
          title="The 10th Door"
          parseConfig={the10thDoorParseConfig}
        />
      </main>
    )
  }

  if (slug === "transfer") {
    return (
      <main id="main" className="flex-1">
        <ScreenplayView
          raw={transferScript}
          locale={locale}
          title="Transfer"
          parseConfig={transferParseConfig}
        />
      </main>
    )
  }

  if (slug === "the-silent-room") {
    return (
      <main id="main" className="flex-1">
        <ScreenplayView
          raw={silentRoomScript}
          locale={locale}
          title="The Silent Room"
          parseConfig={silentRoomParseConfig}
        />
      </main>
    )
  }

  if (slug === "ascent") {
    return (
      <main id="main" className="flex-1">
        <ScreenplayView
          raw={ascentScript}
          locale={locale}
          title="Ascent"
          parseConfig={ascentParseConfig}
        />
      </main>
    )
  }

  if (slug === "deep-pockets") {
    return (
      <main id="main" className="flex-1">
        <ScreenplayView
          raw={deepPocketsScript}
          locale={locale}
          title="Deep Pockets"
          parseConfig={deepPocketsParseConfig}
        />
      </main>
    )
  }

  notFound()
}
