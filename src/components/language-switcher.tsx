"use client"

import { usePathname, useRouter } from "next/navigation"

import { LOCALE_COOKIE, type Locale } from "@/i18n/config"
import { stripLocalePrefix, withLocale } from "@/i18n/paths"
import { cn } from "@/lib/utils"

type Labels = {
  language: string
  en: string
  fr: string
}

const segmentClass = cn(
  "min-w-[2.75rem] rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors",
  "text-muted-foreground hover:text-foreground"
)

const activeClass = "bg-foreground text-background shadow-none hover:bg-foreground hover:text-background"

export function LanguageSwitcher({
  locale,
  labels,
  className,
}: {
  locale: Locale
  labels: Labels
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  function go(target: Locale) {
    if (target === locale) return
    const stripped = stripLocalePrefix(pathname)
    const next = withLocale(target, stripped)
    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`
    router.push(next)
    router.refresh()
  }

  return (
    <div
      className={cn(
        "flex h-11 shrink-0 items-center gap-0.5 rounded-full border border-border bg-background px-1",
        className
      )}
      role="group"
      aria-label={labels.language}
    >
      <button
        type="button"
        className={cn(segmentClass, locale === "en" && activeClass)}
        aria-pressed={locale === "en"}
        onClick={() => go("en")}
      >
        {labels.en}
      </button>
      <button
        type="button"
        className={cn(segmentClass, locale === "fr" && activeClass)}
        aria-pressed={locale === "fr"}
        onClick={() => go("fr")}
      >
        {labels.fr}
      </button>
    </div>
  )
}
