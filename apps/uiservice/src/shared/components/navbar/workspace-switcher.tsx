"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { ChevronsUpDown, Workflow } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import ky from "ky"
import { endPoints } from "@/shared/constants/api-endpoints"
import { toast } from "@/shared/components/ui/use-toast"
import { uiConstants } from "@/shared/constants/global-constants"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateUUID } from "@/shared/lib/uuid-gen"
import { Input } from "../ui/input"

export function WorkspaceSwitcher() {
  return (
    <Input
      className="shadow-sm workspace-switcher pl-4 sm:w-[200px] md:w-[200px] lg:w-[250px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
      placeholder="Search models ..."
    />
  )
}
