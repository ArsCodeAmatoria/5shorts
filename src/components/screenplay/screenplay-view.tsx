import Link from "next/link"

import type { Locale } from "@/i18n/config"
import type { Messages } from "@/i18n/dictionary"
import { getDictionary } from "@/i18n/dictionary"
import {
  parseScreenplay,
  type ParseConfig,
  type ScreenplayLine,
} from "@/lib/screenplay/parse-screenplay"
import { withLocale } from "@/i18n/paths"

function metaLineIsTitle(line: string, title: string): boolean {
  const a = line.trim().toLowerCase().replace(/^the\s+/i, "")
  const b = title.trim().toLowerCase().replace(/^the\s+/i, "")
  return a === b
}

function annotateSceneAnchors(
  lines: ScreenplayLine[]
): { line: ScreenplayLine; firstOfAct: boolean }[] {
  const seen = { "act-1": false, "act-2": false }
  return lines.map((line) => {
    if (line.kind !== "scene") {
      return { line, firstOfAct: false }
    }
    const firstOfAct = !seen[line.actId]
    if (firstOfAct) seen[line.actId] = true
    return { line, firstOfAct }
  })
}

export function ScreenplayView({
  raw,
  locale,
  title,
  parseConfig,
  scriptsPage,
}: {
  raw: string
  locale: Locale
  title: string
  parseConfig: ParseConfig
  scriptsPage: Messages["scriptsPage"]
}) {
  const dict = getDictionary(locale)
  const home = withLocale(locale, "/")

  const { acts, scenes, lines } = parseScreenplay(raw, parseConfig)
  const annotated = annotateSceneAnchors(lines)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:py-16">
      <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-56 lg:shrink-0 xl:w-64">
        <nav
          className="space-y-8 text-sm"
          aria-label={scriptsPage.navAria}
        >
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-foreground">
              {scriptsPage.actsNav}
            </p>
            <ul className="space-y-2">
              {acts.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-foreground">
              {scriptsPage.scenesNav}
            </p>
            <ul className="max-h-[min(60vh,28rem)] space-y-1.5 overflow-y-auto pr-1 text-left">
              {scenes.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-muted-foreground transition hover:text-foreground"
                  >
                    <span className="opacity-70">
                      {s.actId === "act-1" ? "I · " : "II · "}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand">
          {dict.nav.portfolio}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground">{scriptsPage.screenplayIntro}</p>

        <div className="mx-auto mt-12 max-w-2xl space-y-1 text-base leading-relaxed sm:text-[15px]">
          {annotated.map(({ line, firstOfAct }, idx) => (
            <LineBlock
              key={idx}
              line={line}
              firstOfAct={firstOfAct}
              pageTitle={title}
            />
          ))}
        </div>

        <Link
          href={home}
          className="mt-14 inline-flex text-sm font-bold uppercase tracking-[0.24em] text-brand underline-offset-8 hover:underline"
        >
          ← {dict.nav.home}
        </Link>
      </div>
    </div>
  )
}

function LineBlock({
  line,
  firstOfAct,
  pageTitle,
}: {
  line: ScreenplayLine
  firstOfAct: boolean
  pageTitle: string
}) {
  if (line.kind === "blank") {
    return <div className="h-3" aria-hidden />
  }

  if (line.kind === "meta") {
    const t = line.text.trim()
    if (metaLineIsTitle(t, pageTitle)) {
      return (
        <p className="text-2xl font-bold tracking-tight sm:text-3xl">{t}</p>
      )
    }
    return <p className="text-muted-foreground">{line.text.trim()}</p>
  }

  if (line.kind === "scene") {
    return (
      <>
        {firstOfAct ? (
          <div id={line.actId} className="scroll-mt-28" aria-hidden />
        ) : null}
        <h2
          id={line.id}
          className="scroll-mt-28 pt-6 text-center text-sm font-bold uppercase tracking-[0.12em] sm:text-base"
        >
          {line.text}
        </h2>
      </>
    )
  }

  if (line.kind === "heading") {
    return (
      <p className="pt-2 text-center font-bold uppercase tracking-wide">
        {line.text}
      </p>
    )
  }

  if (line.kind === "character") {
    return (
      <p className="pt-4 text-center font-bold tracking-wide">{line.text}</p>
    )
  }

  if (line.kind === "parenthetical") {
    return (
      <p className="text-center italic text-muted-foreground">{line.text}</p>
    )
  }

  if (line.kind === "dialogue") {
    return <p className="text-center font-bold">{line.text}</p>
  }

  return <p className="text-center text-muted-foreground">{line.text}</p>
}
