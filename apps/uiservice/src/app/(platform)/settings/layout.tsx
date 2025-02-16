"use client"
import { ReactElement, ReactNode, useContext } from "react"
import { Button } from "@/shared/components/ui/button"
import {
  CalendarClock,
  Info,
  Key,
  Leaf,
  PlusCircle,
  ShieldCheck,
  User,
} from "lucide-react"
import { GlobalContext } from "@/context/globalstate.provider"
import { Tabs, tabsList } from "./data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useConfirmContext } from "@/shared/providers/confirm.provider"
import ky from "ky"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { toast } from "@/shared/components/ui/use-toast"
import { generateRandomKey } from "@/shared/lib/random-key-gen"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"

const mapTabIcons: Record<Tabs, ReactElement> = {
  user: <User />,
  privacy: <ShieldCheck />,
  apikey: <Key />,
  subscription: <CalendarClock />,
  sustainability: <Leaf />,
  about: <Info />,
}

export default function SetingsLayout({ children }: { children: ReactNode }) {
  const [{ user }, dispatch] = useContext(GlobalContext)
  const pathname = usePathname()
  const { confirm } = useConfirmContext()

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <Link
        key={tab}
        className={`cursor-pointer flex capitalize ${
          pathname.includes(tab) ? "text-white" : "text-zinc-400"
        }`}
        href={`/settings/${tab}`}
      >
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </Link>
    )
  })

  const createAPIKey = async () => {
    const response = await confirm("Are you sure to create a new API Key ?")
    if (response) {
      try {
        await ky.post(`${endPoints.apiKey}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateRandomKey())
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-slate-600">{uiConstants.apiKeyCreated}</p>
          ),
        })
      } catch (error) {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-slate-600">{uiConstants.toastError}</p>
          ),
        })
      }
    }
  }

  return (
    <>
      <div className="mx-auto grid w-full gap-2">
        <div className="flex justify-between">
          <div className="flex gap-4 mb-4">
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-zinc-900"
            >
              <User className="scale-75" />
            </Button>
            <div className="text-white">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-sm font-semibold">{user.email}</p>
            </div>
          </div>
          <Button onClick={createAPIKey}>Create New API Key</Button>
        </div>
      </div>
      <div className="mx-auto grid w-full items-start gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm">{renderTabs}</nav>
        <div>{children}</div>
      </div>
    </>
  )
}
