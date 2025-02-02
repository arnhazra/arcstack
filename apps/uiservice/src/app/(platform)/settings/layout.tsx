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

const mapTabIcons: Record<Tabs, ReactElement> = {
  user: <User />,
  privacy: <ShieldCheck />,
  apikey: <Key />,
  subscription: <CalendarClock />,
  sustainability: <Leaf />,
  about: <Info />,
}

export default function SetingsLayout({ children }: { children: ReactNode }) {
  const [{ user }] = useContext(GlobalContext)
  const pathname = usePathname()

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <Link
        key={tab}
        className={`cursor-pointer flex capitalize ${
          pathname.includes(tab) ? "" : "text-zinc-500"
        }`}
        href={`/settings/${tab}`}
      >
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </Link>
    )
  })

  return (
    <>
      <div className="mx-auto grid w-full gap-2">
        <div className="flex justify-between">
          <div className="flex gap-4 mb-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="scale-75" />
            </Button>
            <div>
              <p className="text-sm  font-semibold">{user.name}</p>
              <p className="text-sm text-zinc-600 font-semibold">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full items-start gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm">{renderTabs}</nav>
        <div>{children}</div>
      </div>
    </>
  )
}
