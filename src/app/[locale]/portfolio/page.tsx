import type { Metadata } from "next"
import { Film } from "lucide-react"
import { notFound } from "next/navigation"

import { PortfolioCard } from "@/components/marketing/portfolio-card"
import { Reveal } from "@/components/marketing/reveal"
import { isLocale } from "@/i18n/config"
import { getDictionary, getLocalizedPortfolio } from "@/i18n/dictionary"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: `${dict.nav.portfolio} — ${dict.metadata.siteTitle}`,
    description: dict.metadata.portfolioDescription,
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)
  const portfolio = getLocalizedPortfolio(raw)

  return (
    <main id="main" className="flex-1 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="mb-14 flex flex-col gap-5 sm:mb-20">
          <div className="flex items-center gap-4 text-brand">
            <Film className="size-7 shrink-0 sm:size-8" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.32em] sm:text-base">
              {dict.portfolioPage.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {dict.portfolioPage.title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
            {dict.portfolioPage.subtitle}
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project, index) => (
            <PortfolioCard
              key={project.href}
              locale={raw}
              project={project}
              delay={index * 0.06}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
