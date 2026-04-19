import Link from "next/link"
import type { ComponentProps } from "react"

import type { Locale } from "@/i18n/config"
import { withLocale } from "@/i18n/paths"

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale
  href: string
}

export function LocalizedLink({
  locale,
  href,
  ...props
}: LocalizedLinkProps) {
  return <Link href={withLocale(locale, href)} {...props} />
}
