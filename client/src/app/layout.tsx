"use client"
import axios from "axios"
import IdentityProvider from "@/_providers/IdentityProvider"
import { AppStateProvider } from "@/_context/appStateProvider"
import { Toaster } from "react-hot-toast"
import { Quicksand } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/_styles/global.sass"
import "@/_styles/header.sass"
import "@/_styles/button.sass"
import "@/_styles/form.sass"
import "@/_styles/genericappcard.sass"

const quickSand = Quicksand({ subsets: ["latin"], weight: ["600"] })

axios.interceptors.request.use((request) => {
  if (localStorage.hasOwnProperty("accessToken")) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    request.headers["x-api-key"] = `${localStorage.getItem("apiKey")}`
  }
  return request
})

axios.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.replace("/")
    }

    return Promise.reject(error)
  }
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })

  return (
    <html lang="en">
      <head>
        <title>Lenstack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Lenstack" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      </head>
      <body className={quickSand.className}>
        <QueryClientProvider client={client}>
          <AppStateProvider>
            <IdentityProvider>
              <main className="mt-2 mb-4 pb-4">
                {children}
                <Toaster position="bottom-right" />
              </main>
            </IdentityProvider>
          </AppStateProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}