import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { transferScript } from "@/content/scripts/transfer"
import { isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { isScriptSlug, scriptTitle, SCRIPT_SLUGS, type ScriptSlug } from "@/lib/script-routes"
import { withLocale } from "@/i18n/paths"
import { cn } from "@/lib/utils"

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

function Placeholder({
  locale,
  slug,
}: {
  locale: Locale
  slug: Exclude<ScriptSlug, "transfer">
}) {
  const dict = getDictionary(locale)
  const home = withLocale(locale, "/")

  let body: string
  if (slug === "deep-pockets") {
    body =
      locale === "fr"
        ? "Le cinquième court — le scénario n’est pas encore écrit."
        : "The fifth short — script not written yet."
  } else {
    body =
      locale === "fr"
        ? "Scénario complet à venir."
        : "Full script coming soon."
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">
        {dict.nav.portfolio}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {scriptTitle(slug)}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground sm:text-xl">{body}</p>
      <Link
        href={home}
        className="mt-10 inline-flex text-sm font-semibold uppercase tracking-[0.24em] text-brand underline-offset-8 hover:underline"
      >
        ← {dict.nav.home}
      </Link>
    </div>
  )
}

function TransferPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const home = withLocale(locale, "/")
  const intro =
    locale === "fr"
      ? "Scénario court — version anglaise."
      : "Short film script — read below."

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-[52rem]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">
        {dict.nav.portfolio}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Transfer
      </h1>
      <p className="mt-2 text-muted-foreground">{intro}</p>
      <pre
        className={cn(
          "mt-10 overflow-x-auto rounded-xl border border-border bg-background p-6 text-left text-[13px] leading-relaxed whitespace-pre-wrap",
          "sm:p-8 sm:text-sm"
        )}
      >
        {transferScript}
      </pre>
      <Link
        href={home}
        className="mt-10 inline-flex text-sm font-semibold uppercase tracking-[0.24em] text-brand underline-offset-8 hover:underline"
      >
        ← {dict.nav.home}
      </Link>
    </div>
  )
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

  if (slug === "transfer") {
    return (
      <main id="main" className="flex-1">
        <TransferPage locale={locale} />
      </main>
    )
  }

  return (
    <main id="main" className="flex-1">
      <Placeholder locale={locale} slug={slug} />
    </main>
  )
}
