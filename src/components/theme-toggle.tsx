"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Switches between lilac field (light) and plum field (dark). */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex h-11 min-w-25 items-center justify-center rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0",
          className
        )}
        aria-hidden
      >
        …
      </span>
    )
  }

  const mode = resolvedTheme === "dark" ? "dark" : "light"
  const isDark = mode === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-11 min-w-25 items-center justify-center rounded-full border border-border px-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors",
        isDark
          ? "bg-lilac text-plum"
          : "bg-plum text-lilac",
        className
      )}
      aria-label={
        isDark ? "Use light lilac background" : "Use dark plum background"
      }
    >
      {isDark ? "Lilac" : "Plum"}
    </button>
  )
}
