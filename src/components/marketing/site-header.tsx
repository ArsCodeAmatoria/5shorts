"use client"

import Link from "next/link"
import { useState } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Locale } from "@/i18n/config"
import type { Messages } from "@/i18n/dictionary"
import { withLocale } from "@/i18n/paths"
import { cn } from "@/lib/utils"

function BurgerLines({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex h-3.5 w-5 flex-col justify-between"
      aria-hidden
    >
      <span
        className={cn(
          "h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200",
          open && "translate-y-[6px] rotate-45"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-full rounded-full bg-current transition-opacity duration-200",
          open && "opacity-0"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200",
          open && "-translate-y-[6px] -rotate-45"
        )}
      />
    </span>
  )
}

const menuTriggerClass = cn(
  buttonVariants({ variant: "outline", size: "icon" }),
  "size-11 shrink-0 rounded-full border-border bg-background text-foreground",
  "hover:bg-foreground hover:text-background"
)

export function SiteHeader({
  locale,
  nav,
  header,
}: {
  locale: Locale
  nav: { label: string; href: string }[]
  header: Messages["header"]
}) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 flex w-full justify-end gap-2 bg-background p-4 sm:gap-3 sm:p-6"
      role="banner"
    >
      <LanguageSwitcher
        locale={locale}
        labels={{
          language: header.language,
          en: header.switchToEn,
          fr: header.switchToFr,
        }}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className={menuTriggerClass}>
          <span className="sr-only">
            {open ? header.closeMenu : header.openMenu}
          </span>
          <BurgerLines open={open} />
        </SheetTrigger>
        <SheetContent
          side="right"
          showCloseButton
          className={cn(
            "gap-0 border-0 p-0 shadow-none",
            "data-[side=right]:!inset-0 data-[side=right]:!h-dvh data-[side=right]:!w-screen data-[side=right]:!max-w-none",
            "data-[side=right]:!rounded-none data-[side=right]:!border-0",
            "sm:data-[side=right]:!max-w-none",
            "flex flex-col justify-center bg-background"
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{header.siteMenu}</SheetTitle>
          </SheetHeader>
          <nav
            className="flex flex-col gap-1 px-8 py-16 sm:gap-2 sm:px-14 sm:py-20"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className={cn(
                  "py-5 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold uppercase leading-none tracking-[0.12em] text-foreground transition-colors",
                  "first:pt-0 hover:text-brand sm:py-7"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <ThemeToggle className="shrink-0" />
    </header>
  )
}
