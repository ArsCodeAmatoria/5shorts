import Link from "next/link"

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center"
    >
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground sm:text-lg">
        The page you’re looking for doesn’t exist, or the link may be out of
        date.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em]">
        <Link
          href="/en"
          className="text-brand underline-offset-10 transition hover:underline"
        >
          English home
        </Link>
        <Link
          href="/fr"
          className="text-brand underline-offset-10 transition hover:underline"
        >
          Accueil (FR)
        </Link>
      </div>
    </main>
  )
}
