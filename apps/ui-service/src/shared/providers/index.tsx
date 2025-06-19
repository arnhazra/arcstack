"use client"
import { ReactNode } from "react"
import { FetchProvider } from "./fetch.provider"
import { AppStateProvider } from "../../context/appstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"
import { TooltipProvider } from "../components/ui/tooltip"
import { Toaster } from "sonner"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <FetchProvider>
        <AppStateProvider>
          <ConfirmProvider>
            <PromptProvider>{children}</PromptProvider>
          </ConfirmProvider>
          <Toaster
            toastOptions={{
              style: {
                background: "#18181b",
                borderColor: "#27272a",
                color: "#ffffff",
              },
            }}
            style={{
              background: "#18181b",
              borderColor: "#27272a",
              color: "#ffffff",
            }}
          />
        </AppStateProvider>
      </FetchProvider>
    </TooltipProvider>
  )
}
