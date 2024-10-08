import { ReactNode } from "react"
import { brandName } from "@/constants/global-constants"
import { Quicksand } from "next/font/google"
import Providers from "@/providers"
import "@/styles/globals.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["700"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{brandName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="FullStack App" />
      </head>
      <body className={quickSand.className}>
        <Providers>
          <main className="min-h-screen w-full bg-zinc-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}