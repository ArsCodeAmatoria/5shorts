"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import type { Locale } from "@/i18n/config"
import type { LocalizedProject } from "@/i18n/dictionary"
import { withLocale } from "@/i18n/paths"
import { cn } from "@/lib/utils"

function cardHrefLabel(href: string) {
  if (href.startsWith("/")) return href.slice(1)
  return href.replace(/^https?:\/\//, "")
}

export function PortfolioCard({
  project,
  locale,
  delay = 0,
}: {
  project: LocalizedProject
  locale: Locale
  delay?: number
}) {
  const reduce = useReducedMotion()
  const internal = project.href.startsWith("/")
  const to = internal ? withLocale(locale, project.href) : project.href

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-8% 0px" } as const,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
          delay,
        },
      }

  const cardClass = cn(
    "flex h-full flex-col justify-between gap-8 rounded-xl border border-border bg-background p-7 transition sm:p-8",
    "hover:border-foreground hover:bg-foreground hover:text-background"
  )

  const inner = (
    <>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <span className="rounded-full border border-border p-2.5 text-muted-foreground transition group-hover:border-background group-hover:bg-background group-hover:text-foreground sm:p-3">
            <ArrowUpRight className="size-5 sm:size-6" aria-hidden />
          </span>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground group-hover:text-background sm:text-lg">
          {project.description}
        </p>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-background sm:text-sm">
        {cardHrefLabel(project.href)}
      </p>
    </>
  )

  return (
    <motion.article {...motionProps} className="group relative h-full">
      {internal ? (
        <Link href={to} className={cn(cardClass, "block")}>
          {inner}
        </Link>
      ) : (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          {inner}
        </a>
      )}
    </motion.article>
  )
}
