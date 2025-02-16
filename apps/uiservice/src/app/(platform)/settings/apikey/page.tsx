"use client"
import SectionPanel from "../(components)/sectionpanel"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateUUID } from "@/shared/lib/uuid-gen"
import { useConfirmContext } from "@/shared/providers/confirm.provider"
import ky from "ky"
import { useContext } from "react"
import { APIKey } from "@/shared/types"
import { Key } from "lucide-react"
import CopyToClipboard from "@/shared/components/copy"

export default function Page() {
  const [{ user }, dispatch] = useContext(GlobalContext)
  const { confirm } = useConfirmContext()

  const deleteAPIKey = async (apiKeyId: string) => {
    const response = await confirm("Are you sure to delete this API Key ?")
    if (response) {
      try {
        await ky.delete(`${endPoints.workspace}/${workspaceId}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateUUID())
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-slate-600">{uiConstants.workspaceDeleted}</p>
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

  const renderAPIKeys = apiKeys?.map((apiKey: APIKey) => {
    return (
      <SectionPanel
        key={apiKey._id}
        title={apiKey._id}
        icon={<Key />}
        content={apiKey.apiKey}
        masked={true}
        actionComponent={<CopyToClipboard value={apiKey.apiKey} />}
      />
    )
  })

  return <section className="grid gap-2">{renderWorkspaces}</section>
}
