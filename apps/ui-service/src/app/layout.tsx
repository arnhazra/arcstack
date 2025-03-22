import { ReactNode } from "react"
import { brandName } from "@/shared/constants/global-constants"
import { Quicksand } from "next/font/google"
import Providers from "@/shared/providers"
import NextTopLoader from "nextjs-toploader"
import "../shared/styles/globals.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["700"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{brandName}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="theme-color" content="#18181b" />
        <meta
          name="description"
          content="AI models marketplace for developers"
        />
      </head>
      <body className={quickSand.className}>
        <Providers>
          <NextTopLoader color="#1db954" showSpinner={false} height={2} />
          <main className="min-h-screen w-full bg-main">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
