import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HtmlLang } from "@/components/html-lang"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"
import { isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

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
    description: dict.metadata.siteDescription,
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      siteName: dict.metadata.ogSiteName,
      locale: raw === "fr" ? "fr_CA" : "en_CA",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  const dict = getDictionary(locale)
  const nav = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.portfolio, href: "/portfolio" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contact, href: "/contact" },
  ]

  return (
    <>
      <HtmlLang locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {dict.skipToContent}
      </a>
      <SiteHeader locale={locale} nav={nav} header={dict.header} />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter
        locale={locale}
        name={dict.footer.copyrightName}
        footer={dict.footer}
      />
    </>
  )
}
