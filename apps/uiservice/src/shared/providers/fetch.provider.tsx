"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { FetchInterceptor } from "@mswjs/interceptors/fetch"

const interceptor = new FetchInterceptor()

interceptor.apply()
interceptor.on("request", ({ request }) => {
  request.headers.set(
    "Authorization",
    `Bearer ${localStorage.getItem("accessToken")}`
  )
  request.headers.set(
    "refresh_token",
    `${localStorage.getItem("refreshToken")}`
  )
})

interceptor.on("response", ({ response }) => {
  if (response.headers.has("token") || response.headers.has("Token")) {
    const newAccessToken =
      response.headers.get("token") ?? response.headers.get("Token") ?? ""
    localStorage.setItem("accessToken", newAccessToken)
  }

  if (response.status === 401) {
    localStorage.clear()
    window.location.replace("/")
  }
})

export function FetchProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryDelay: 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
