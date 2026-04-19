import type { Metadata } from "next"
import { Archivo_Black, Fleur_De_Leah } from "next/font/google"
import { ArrowUpRight, Film, Mail, MapPin } from "lucide-react"
import { notFound } from "next/navigation"

import { CanadianMapleLeaf } from "@/components/marketing/canadian-maple-leaf"
import { PortfolioCard } from "@/components/marketing/portfolio-card"
import { Reveal } from "@/components/marketing/reveal"
import { LocalizedLink } from "@/components/localized-link"
import { isLocale, type Locale } from "@/i18n/config"
import { getDictionary, getLocalizedPortfolio } from "@/i18n/dictionary"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const heroLogo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
})

const flowerMark = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.homeDescription,
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  const dict = getDictionary(locale)
  const portfolio = getLocalizedPortfolio(locale)

  return (
    <main id="main" className="flex-1">
      <section>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-6 sm:gap-12 sm:px-6 sm:pb-10 sm:pt-10 lg:gap-14 lg:pb-12 lg:pt-14">
          <Reveal>
            <h1 className="flex w-full max-w-6xl flex-col leading-none">
              <span
                className={cn(
                  heroLogo.className,
                  "text-[clamp(3.75rem,17vw,11.5rem)] tracking-[-0.03em] text-foreground"
                )}
              >
                5
              </span>
              <span
                className={cn(
                  heroLogo.className,
                  "-mt-[0.04em] text-[clamp(3.75rem,17vw,11.5rem)] tracking-[-0.03em] text-foreground sm:-mt-[0.06em]"
                )}
              >
                Shorts
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <div
              className="flex items-center gap-3 text-sm sm:gap-4 sm:text-base"
              lang={dict.home.heroLang}
            >
              <div className="min-w-0 space-y-1.5">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand sm:text-base">
                  {dict.home.heroLine1}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                  {dict.home.heroLine2}
                </p>
              </div>
              <CanadianMapleLeaf className="h-11 w-auto shrink-0 text-brand sm:h-14 lg:h-16" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="max-w-4xl">
            <p className="text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {dict.home.lead}{" "}
              <span
                className={cn(
                  flowerMark.className,
                  "inline-block align-baseline text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-none text-foreground"
                )}
                aria-hidden
              >
                *
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.14} className="max-w-3xl">
            <p className="text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              {dict.home.bio}{" "}
              <span className="text-foreground">{site.person.name}</span> —{" "}
              {dict.home.rolesClause}.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="max-w-3xl space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.32em] text-brand sm:text-base">
              {dict.home.indieHeading}
            </h2>
            <div className="space-y-5 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              <p>{dict.home.indieP1}</p>
              <p>{dict.home.indieP2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 lg:pb-32 lg:pt-14">
          <Reveal className="space-y-6">
            <div className="flex items-center gap-4 text-brand">
              <Film className="size-7 shrink-0 sm:size-8" aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-[0.32em] sm:text-base">
                {dict.home.portfolioEyebrow}
              </span>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {dict.home.portfolioTitle}
                </h2>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  {dict.home.portfolioBlurb}
                </p>
              </div>
              <LocalizedLink
                locale={locale}
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-brand underline-offset-10 transition hover:underline sm:text-base"
              >
                {dict.home.portfolioCta}
                <ArrowUpRight className="size-5 sm:size-6" aria-hidden />
              </LocalizedLink>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((project, index) => (
              <PortfolioCard
                key={project.href}
                locale={locale}
                project={project}
                delay={0.28 + index * 0.06}
              />
            ))}
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-[0.32em] text-brand sm:text-base">
                {dict.home.aboutEyebrow}
              </span>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {dict.home.aboutTitle}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.home.aboutBody}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.home.aboutRoles}
                </p>
              </div>
              <LocalizedLink
                locale={locale}
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-brand underline-offset-10 transition hover:underline sm:text-base"
              >
                {dict.home.aboutCta}
                <ArrowUpRight className="size-5 sm:size-6" aria-hidden />
              </LocalizedLink>
            </Reveal>

            <Reveal className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-[0.32em] text-brand sm:text-base">
                {dict.home.contactEyebrow}
              </span>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {dict.home.contactTitle}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.home.contactBody}
                </p>
              </div>
              <div className="flex flex-col gap-4 text-base sm:text-lg">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 font-medium text-foreground transition hover:text-brand"
                >
                  <Mail className="size-5 shrink-0 text-brand sm:size-6" aria-hidden />
                  {site.email}
                </a>
                <span className="inline-flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-5 shrink-0 text-brand sm:size-6" aria-hidden />
                  {site.location}
                </span>
              </div>
              <LocalizedLink
                locale={locale}
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-brand underline-offset-10 transition hover:underline sm:text-base"
              >
                {dict.home.contactCta}
                <ArrowUpRight className="size-5 sm:size-6" aria-hidden />
              </LocalizedLink>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
