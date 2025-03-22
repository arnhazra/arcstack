"use client"
import SectionPanel from "../../../../shared/components/sectionpanel"
import { toast } from "sonner"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { generateRandomKey } from "@/shared/lib/random-key-gen"
import { useConfirmContext } from "@/shared/providers/confirm.provider"
import ky from "ky"
import { useContext } from "react"
import { APIKey } from "@/shared/types"
import { Bell, Key, Trash } from "lucide-react"
import CopyToClipboard from "@/shared/components/copy"
import useQuery from "@/shared/hooks/use-query"
import HTTPMethods from "@/shared/constants/http-methods"
import { Button } from "@/shared/components/ui/button"

export default function Page() {
  const [{ refreshId }, dispatch] = useContext(GlobalContext)
  const { confirm } = useConfirmContext()

  const apiKeys = useQuery<APIKey[]>({
    queryKey: ["get-apikeys", refreshId],
    queryUrl: endPoints.apiKey,
    method: HTTPMethods.GET,
  })

  const deleteAPIKey = async (apiKeyId: string) => {
    const response = await confirm("Are you sure to delete this API Key ?")
    if (response) {
      try {
        await ky.delete(`${endPoints.apiKey}/${apiKeyId}`, {
          timeout: FETCH_TIMEOUT,
        })
        dispatch("setRefreshId", generateRandomKey())
        toast(uiConstants.notification, {
          icon: <Bell className="scale-75" />,
          description: uiConstants.apiKeyDeleted,
        })
      } catch (error) {
        toast(uiConstants.notification, {
          icon: <Bell className="scale-75" />,
          description: uiConstants.toastError,
        })
      }
    }
  }

  const renderAPIKeys = apiKeys?.data?.map((key, index) => {
    return (
      <SectionPanel
        key={key._id}
        title={`API Key ${index + 1}`}
        icon={<Key className="scale-75" />}
        content={key.apiKey}
        masked={true}
        actionComponents={[
          <CopyToClipboard value={key.apiKey} />,
          <Button
            size="icon"
            disabled={apiKeys?.data?.length === 1}
            variant="destructive"
            onClick={(): Promise<void> => deleteAPIKey(key._id)}
          >
            <Trash className="scale-50" />
          </Button>,
        ]}
      />
    )
  })

  return <section className="grid gap-2">{renderAPIKeys}</section>
}
