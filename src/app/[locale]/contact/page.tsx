import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"
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
    title: `${dict.nav.contact} — ${dict.metadata.siteTitle}`,
    description: dict.metadata.contactDescription,
  }
}

export default async function ContactPage({
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
        <Reveal className="flex flex-col gap-8 bg-card p-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:p-14">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              {dict.contact.body}
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
        </Reveal>
      </div>
    </main>
  )
}
