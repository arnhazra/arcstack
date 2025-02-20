"use client"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import { Book } from "lucide-react"
import useQuery from "@/shared/hooks/use-query"
import HTTPMethods from "@/shared/constants/http-methods"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/shared/constants/global-constants"
import ActivityLog from "@/shared/components/activity"
import { use } from "react"
import Show from "@/shared/components/show"
import Loading from "@/app/loading"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  return <>{id}</>
}
