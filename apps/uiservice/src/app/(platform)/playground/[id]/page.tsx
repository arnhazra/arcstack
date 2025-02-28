"use client"
import { Bell, CornerDownLeft } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { endPoints } from "@/shared/constants/api-endpoints"
import { use, useContext, useState } from "react"
import ky from "ky"
import { toast } from "sonner"
import { uiConstants } from "@/shared/constants/global-constants"
import Show from "@/shared/components/show"
import LoaderIcon from "@/shared/components/loaderIcon"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { APIKey, DerivedModel } from "@/shared/types"
import { useRouter } from "nextjs-toploader/app"
import Error from "@/app/error"
import { GlobalContext } from "@/context/globalstate.provider"
import { useSearchParams } from "next/navigation"
import { SubscriptionModal } from "@/shared/components/subscriptionmodal"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: modelId = "" } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [{ subscription }] = useContext(GlobalContext)
  const isSubscriptionActive =
    subscription && new Date(subscription.endsAt) > new Date()
  const threadId = searchParams.get("threadId")
  const model = useQuery<DerivedModel>({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getOneDerivedModel}/${modelId}`,
    method: HTTPMethods.GET,
  })
  const apiKeys = useQuery<APIKey[]>({
    queryKey: ["get-apikeys-pg"],
    queryUrl: endPoints.apiKey,
    method: HTTPMethods.GET,
  })

  const guardActive =
    (model.data?.baseModel?.isPro as boolean) && !isSubscriptionActive

  const [prompt, setPrompt] = useState("")
  const [requestBody, setRequestBody] = useState({
    modelId: modelId,
    prompt: "",
    temperature: model?.data?.baseModel?.defaultTemperature ?? 0.7,
    topP: model?.data?.baseModel?.defaultTemperature ?? 1,
  })
  const [response, setReseponse] = useState<any>({})
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()
    setPrompt("")

    try {
      setReseponse({})
      setLoading(true)
      const res = await ky
        .post(`${endPoints.intelligenceChat}`, {
          json: { ...requestBody, threadId: threadId ?? undefined },
          headers: {
            "x-api-key": !!apiKeys?.data?.length ? apiKeys.data[0].apiKey : "",
          },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      setReseponse(res)
      if (!threadId) {
        router.push(`?threadId=${(res as any).threadId}`)
      }
    } catch (error: any) {
      setReseponse({})
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.connectionErrorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Show condition={!model.error} fallback={<Error />}>
      <SubscriptionModal
        open={guardActive}
        customMessage="You need Pro subscription to access this model"
        onOpenChange={(): void => undefined}
      />
      <Card className="xl:col-span-2 bg-background border-border text-white">
        <CardHeader className="px-7">
          <CardTitle>{model.data?.displayName}</CardTitle>
          <CardDescription className="text-zinc-200">
            Playground
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative flex-col items-start gap-8 md:flex">
              <div className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border border-border p-4">
                  <legend className="px-1 text-sm font-medium">Settings</legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Base Model</Label>
                    <Input
                      className="bg-background border-border text-white"
                      disabled
                      defaultValue={model.data?.baseModel?.displayName}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      className="bg-background border-border text-white"
                      id="temperature"
                      type="number"
                      defaultValue={model?.data?.baseModel?.defaultTemperature}
                      onChange={(e): void =>
                        setRequestBody({
                          ...requestBody,
                          temperature: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input
                      className="bg-background border-border text-white"
                      id="top-p"
                      type="number"
                      defaultValue={model?.data?.baseModel?.defaultTopP}
                      onChange={(e): void =>
                        setRequestBody({
                          ...requestBody,
                          topP: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </fieldset>
                <p className="text-xs text-zinc-200 mt-2 mb-2">
                  {uiConstants.aiSafetyStatement}
                </p>
              </div>
            </div>
            <div className="relative flex h-full flex-col rounded-xl bg-muted/50 pt-4 lg:col-span-2">
              <form onSubmit={hitAPI}>
                <div className="relative overflow-hidden rounded-lg border-none bg-background -mt-2">
                  <Label htmlFor="message" className="sr-only">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={prompt}
                    required
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none bg-border text-white"
                    onChange={(e): void => {
                      setPrompt(e.target.value)
                      setRequestBody({
                        ...requestBody,
                        prompt: e.target.value,
                      })
                    }}
                  />
                  <div className="flex items-center pt-0">
                    <Button
                      size="sm"
                      className="ml-auto gap-1.5 mt-4 bg-primary hover:bg-primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      <Show
                        condition={!isLoading}
                        fallback={
                          <>
                            <LoaderIcon />
                            Loading
                          </>
                        }
                      >
                        Send Message
                        <CornerDownLeft className="scale-75" />
                      </Show>
                    </Button>
                  </div>
                </div>
              </form>
              <div className="mt-4 ms-2">{response?.response ?? ""}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Show>
  )
}
