import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Reveal } from "@/components/marketing/reveal"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { site } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = getDictionary(raw)
  return {
    title: `${dict.nav.about} — ${dict.metadata.siteTitle}`,
    description: dict.metadata.aboutDescription,
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const dict = getDictionary(raw)

  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-14 sm:grid-cols-[1.1fr_0.9fr] sm:gap-16">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {dict.about.title}
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="space-y-8 text-muted-foreground">
            <p className="text-xl leading-relaxed sm:text-2xl">{dict.about.body}</p>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand sm:text-base">
                {dict.about.roleHeading}
              </p>
              <p className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {site.person.name}
              </p>
              <p className="mt-2 text-base uppercase tracking-[0.2em] text-muted-foreground sm:text-lg">
                {dict.about.rolesLine}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-16 max-w-3xl sm:mt-20">
          <section
            className="border-t border-border pt-14 sm:pt-16"
            aria-labelledby="about-craft-heading"
          >
            <h2
              id="about-craft-heading"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-brand sm:text-base"
            >
              {dict.about.craftHeading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {dict.about.craftIntro}
            </p>
            <ul className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {dict.about.craftBullets.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </main>
  )
}
