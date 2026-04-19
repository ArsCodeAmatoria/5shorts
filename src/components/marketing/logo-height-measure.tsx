import { cn } from "@/lib/utils"

/** Position from top of logo: foot 5 = top, foot 0 = bottom. */
function footToTopPct(foot: number) {
  return ((5 - foot) / 5) * 100
}

/**
 * Full-height ruler beside the hero wordmark: spine + five equal feet, minor
 * ticks between, 5′ emphasized — matches grid row height (logo block).
 */
export function LogoHeightMeasure({ className }: { className?: string }) {
  const majorY = [0, 20, 40, 60, 80, 100] as const
  const minorY = [10, 30, 50, 70, 90] as const

  return (
    <div
      className={cn(
        "relative isolate h-full min-h-0 w-17 shrink-0 self-stretch sm:w-20",
        "text-brand",
        className
      )}
      aria-hidden
    >
      {/* Ruler geometry only — ticks stay left so numerals stay clear */}
      <svg
        className="absolute inset-0 z-0 h-full w-[52%] max-w-13"
        viewBox="0 0 24 100"
        preserveAspectRatio="none"
      >
        <g
          className="text-brand"
          stroke="currentColor"
          fill="none"
          vectorEffect="non-scaling-stroke"
        >
          <line x1="5" y1="0" x2="5" y2="100" strokeWidth="2" opacity={0.55} />

          {minorY.map((y) => (
            <line
              key={`m-${y}`}
              x1="5"
              y1={y}
              x2="12"
              y2={y}
              strokeWidth="1"
              opacity={0.35}
            />
          ))}

          {majorY.map((y) => {
            const isTop = y === 0
            const isBottom = y === 100
            const x2 = isTop ? 16 : isBottom ? 11 : 14
            return (
              <line
                key={`M-${y}`}
                x1="5"
                y1={y}
                x2={x2}
                y2={y}
                strokeWidth={isTop ? 3 : 1.25}
                opacity={isTop ? 1 : isBottom ? 0.4 : 0.72}
              />
            )
          })}
        </g>
      </svg>

      {/* Numerals to the right of all ticks; above SVG paint */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <span
          className="absolute right-0 -translate-y-1/2 whitespace-nowrap pl-1 text-[0.65rem] font-black leading-none tracking-tight sm:text-xs"
          style={{ top: `${footToTopPct(5)}%` }}
        >
          5′
        </span>
        {([4, 3, 2, 1] as const).map((foot) => (
          <span
            key={foot}
            className="absolute right-0 -translate-y-1/2 whitespace-nowrap pl-1 text-[0.6rem] font-medium tabular-nums leading-none tracking-tight opacity-80 sm:text-[0.7rem]"
            style={{ top: `${footToTopPct(foot)}%` }}
          >
            {foot}
          </span>
        ))}
      </div>
    </div>
  )
}
