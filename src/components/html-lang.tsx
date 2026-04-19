"use client"

import { useLayoutEffect } from "react"

import type { Locale } from "@/i18n/config"

/** Syncs `<html lang>` with the active locale (root layout cannot read `[locale]`). */
export function HtmlLang({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
