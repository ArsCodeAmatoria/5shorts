import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "5 Shorts",
  description:
    "Independent film production company. Producer, director, and writer Leigh Akin.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme={false}
          storageKey="5shorts-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
