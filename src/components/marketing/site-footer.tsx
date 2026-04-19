import { LocalizedLink } from "@/components/localized-link"
import type { Locale } from "@/i18n/config"
import type { Messages } from "@/i18n/dictionary"

export function SiteFooter({
  locale,
  name,
  footer,
}: {
  locale: Locale
  name: string
  footer: Messages["footer"]
}) {
  return (
    <footer className="bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-foreground sm:text-base">
          © {new Date().getFullYear()}{" "}
          <LocalizedLink
            locale={locale}
            href="/"
            className="transition-colors hover:text-foreground"
          >
            {name}
          </LocalizedLink>
        </p>
        <nav
          className="flex flex-wrap gap-8 text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground sm:text-base"
          aria-label={footer.aria}
        >
          <LocalizedLink locale={locale} href="/" className="hover:text-foreground">
            {footer.home}
          </LocalizedLink>
          <LocalizedLink
            locale={locale}
            href="/portfolio"
            className="hover:text-foreground"
          >
            {footer.portfolio}
          </LocalizedLink>
          <LocalizedLink locale={locale} href="/about" className="hover:text-foreground">
            {footer.about}
          </LocalizedLink>
          <LocalizedLink
            locale={locale}
            href="/contact"
            className="hover:text-foreground"
          >
            {footer.contact}
          </LocalizedLink>
        </nav>
      </div>
    </footer>
  )
}
