/** Parse feature-style screenplay text into acts, scene anchors, and typed lines. */

export type ScreenplayLine =
  | { kind: "meta"; text: string }
  | { kind: "blank" }
  | { kind: "scene"; id: string; text: string; actId: "act-1" | "act-2" }
  | { kind: "heading"; text: string }
  | { kind: "character"; text: string }
  | { kind: "parenthetical"; text: string }
  | { kind: "dialogue"; text: string }
  | { kind: "action"; text: string }

export type NavScene = { id: string; label: string; actId: "act-1" | "act-2" }
export type NavAct = { id: string; label: string }

export type ParseConfig = {
  acts: [NavAct, NavAct]
  /** Return true when this trimmed scene heading starts the second act. */
  secondActOnHeading: (trimmedLine: string) => boolean
}

export const transferParseConfig: ParseConfig = {
  acts: [
    { id: "act-1", label: "Act I — The alley" },
    { id: "act-2", label: "Act II — The bus" },
  ],
  secondActOnHeading: (t) =>
    /^INT\. VANCOUVER BUS/i.test(t) ||
    /^EXT\. BUS STOP/i.test(t) ||
    /^CUT TO — INT\. VANCOUVER BUS/i.test(t) ||
    /^CUT TO — EXT\. BUS STOP/i.test(t),
}

export const silentRoomParseConfig: ParseConfig = {
  acts: [
    { id: "act-1", label: "Act I — The facility" },
    { id: "act-2", label: "Act II — The room" },
  ],
  secondActOnHeading: (t) => /^INT\. SILENT ROOM/i.test(t),
}

function stripTrailingPeriods(t: string): string {
  return t.replace(/\.+$/, "").trim()
}

export const ascentParseConfig: ParseConfig = {
  acts: [
    { id: "act-1", label: "Act I — The ground" },
    { id: "act-2", label: "Act II — The rise" },
  ],
  secondActOnHeading: (t) => /^SOUND SHIFT$/i.test(stripTrailingPeriods(t)),
}

export const deepPocketsParseConfig: ParseConfig = {
  acts: [
    { id: "act-1", label: "Act I — The stop" },
    { id: "act-2", label: "Act II — The court" },
  ],
  secondActOnHeading: (t) => /^INT\. COURTROOM/i.test(t),
}

export const the10thDoorParseConfig: ParseConfig = {
  acts: [
    { id: "act-1", label: "Act I — The door" },
    { id: "act-2", label: "Act II — Beyond" },
  ],
  secondActOnHeading: (t) => /^EXT\. OPEN COSMOS/i.test(t),
}

function isParenthetical(line: string): boolean {
  const t = line.trim()
  return t.startsWith("(") && t.endsWith(")")
}

function isSceneHeading(tRaw: string): boolean {
  const t = stripTrailingPeriods(tRaw)
  if (!t) return false
  if (/^(EXT\.|INT\.)/i.test(t)) return true
  if (/^FADE IN/i.test(t)) return true
  if (/^FADE OUT/i.test(t)) return true
  if (/^CUT TO/i.test(t)) return true
  if (/^INSERT/i.test(t)) return true
  if (/^BACK TO/i.test(t)) return true
  if (/^POV\b/i.test(t)) return true
  if (/^SOUND DESIGN:/i.test(t)) return true
  if (/^CLOSE ON/i.test(t)) return true
  if (/^MID SHOTS/i.test(t)) return true
  if (/^TIME PASSES$/i.test(t)) return true
  if (/^LATER$/i.test(t)) return true
  if (/^WIDER$/i.test(t)) return true
  if (/^BUS STOPS$/i.test(t)) return true
  if (/^ANOTHER STOP$/i.test(t)) return true
  if (/^DOORS OPEN$/i.test(t)) return true
  if (/^BUS SLOWS$/i.test(t)) return true
  if (/^PAN DOWN/i.test(t)) return true
  if (/^SOUND DROPS OUT$/i.test(t)) return true
  if (/^CUT TO BLACK$/i.test(t)) return true
  if (/^CUT TO WHITE$/i.test(t)) return true
  if (/^END$/i.test(t)) return true
  /* Ascent / visual-sequence shot lines */
  if (/^WIDE SHOT$/i.test(t)) return true
  if (/^WIDE –/i.test(t)) return true
  if (/^CLOSE-UP/i.test(t)) return true
  if (/^CLOSE –/i.test(t)) return true
  if (/^MEDIUM –/i.test(t)) return true
  if (/^LOW ANGLE/i.test(t)) return true
  if (/^SOUND SHIFT$/i.test(t)) return true
  if (/^HOLD$/i.test(t)) return true
  if (/^SOUND$/i.test(t)) return true
  if (/^FINAL SHOT OF SEQUENCE$/i.test(t)) return true
  if (/^SNAP \(QUIET\)$/i.test(t)) return true
  return false
}

const SFX_WORDS = new Set([
  "CLICK",
  "RING",
  "SILENCE",
  "BRUSH",
  "END",
  "HUM",
  "BANG",
])

/** Character / cue line: ALL CAPS, optional trailing (…) groups; not a scene heading. */
function isCharacterCue(tRaw: string): boolean {
  const t = tRaw.trim()
  if (!t || t.length > 72) return false
  if (/[a-z]/.test(t)) return false
  if (isSceneHeading(t)) return false
  const bare = stripTrailingPeriods(t)
  if (bare.split(/\s+/).length === 1 && SFX_WORDS.has(bare)) return false
  if (
    /^(TWO|THEY|NO ONE|FOUR|INSIDE|TOO|THAT|NOT|AND|OR|THE|A FEW|EMPTY|SMALL|THEN|STILL|JUST|NEXT|PASSENGER|REAL|SOFT)\b/i.test(
      t
    )
  )
    return false
  if (/^([A-Z][A-Z0-9\s.'()–/]*)(\s*\([^)]+\))*$/.test(t)) {
    return true
  }
  return false
}

export function parseScreenplay(
  raw: string,
  config: ParseConfig
): {
  acts: NavAct[]
  scenes: NavScene[]
  lines: ScreenplayLine[]
} {
  const lines = raw.split(/\r?\n/)
  const result: ScreenplayLine[] = []
  const navScenes: NavScene[] = []
  let actId: "act-1" | "act-2" = "act-1"
  let sceneCounter = 0

  function registerScene(displayText: string): string {
    sceneCounter += 1
    const id = `sc-${sceneCounter}`
    const label =
      displayText.replace(/^CUT TO:?\s*/i, "").trim().slice(0, 88) ||
      displayText.slice(0, 88)
    navScenes.push({ id, label, actId })
    return id
  }

  let i = 0

  while (i < lines.length && !/^FADE IN/i.test(lines[i].trim())) {
    const t = lines[i]
    if (!t.trim()) result.push({ kind: "blank" })
    else result.push({ kind: "meta", text: t })
    i++
  }

  let expectDialogue = false
  /** True until the first dialogue line after a character cue (blanks before that line are allowed). */
  let awaitingFirstDialogue = false

  while (i < lines.length) {
    const line = lines[i]
    const t = line.trim()

    if (!t) {
      if (expectDialogue && awaitingFirstDialogue) {
        result.push({ kind: "blank" })
        i++
        continue
      }
      expectDialogue = false
      awaitingFirstDialogue = false
      result.push({ kind: "blank" })
      i++
      continue
    }

    if (config.secondActOnHeading(t)) {
      actId = "act-2"
    }

    if (/^CUT TO:?$/i.test(t) && i + 1 < lines.length) {
      const next = lines[i + 1].trim()
      if (/^(EXT\.|INT\.)/i.test(next)) {
        if (config.secondActOnHeading(next)) actId = "act-2"
        const combined = `CUT TO — ${next}`
        const id = registerScene(combined)
        result.push({ kind: "scene", id, text: combined, actId })
        i += 2
        expectDialogue = false
        awaitingFirstDialogue = false
        continue
      }
    }

    if (isSceneHeading(t)) {
      if (config.secondActOnHeading(t)) actId = "act-2"
      const id = registerScene(t)
      result.push({ kind: "scene", id, text: t, actId })
      expectDialogue = false
      awaitingFirstDialogue = false
      i++
      continue
    }

    if (isCharacterCue(t)) {
      expectDialogue = true
      awaitingFirstDialogue = true
      result.push({ kind: "character", text: t })
      i++
      continue
    }

    if (expectDialogue && isParenthetical(t)) {
      result.push({ kind: "parenthetical", text: t })
      i++
      continue
    }

    if (expectDialogue) {
      result.push({ kind: "dialogue", text: t })
      awaitingFirstDialogue = false
      i++
      continue
    }

    result.push({ kind: "action", text: line })
    i++
  }

  return { acts: config.acts, scenes: navScenes, lines: result }
}
