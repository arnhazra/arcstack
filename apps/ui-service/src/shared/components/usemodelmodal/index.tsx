"use client"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Badge } from "@/shared/components/ui/badge"
import { X, MessageCircle, Code, DraftingCompass, Key } from "lucide-react"
import { useContext, useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { APIReference, BaseModel } from "@/shared/types"
import { brandName } from "@/shared/constants/global-constants"
import useQuery from "@/shared/hooks/use-query"
import HTTPMethods from "@/shared/constants/http-methods"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import SnippetPanel from "../snippet"
import { useRouter } from "next/navigation"
import Show from "../show"
import { AppContext } from "@/context/appstate.provider"
import { SubscriptionModal } from "../subscriptionmodal"
import {
  excludedKeys,
  formatKey,
  formatValue,
} from "@/shared/lib/format-key-value"

export default function UseThisModelModal({
  model,
}: {
  model: BaseModel | undefined
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [{ isSubscriptionActive }] = useContext(AppContext)
  const apiReference = useQuery<APIReference[]>({
    method: HTTPMethods.GET,
    queryKey: ["get-apireference"],
    queryUrl: endPoints.getapireference,
  })

  const listAPIRefereneces = apiReference?.data?.map((item) => {
    return (
      <SnippetPanel
        key={item.apiName}
        description={item.apiDescription}
        method={item.apiMethod}
        request={item.sampleRequestBody}
        response={item.sampleResponseBody}
        title={item.apiName}
        url={`${apiHost}/${item.apiUri}`}
      />
    )
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary">
          <Code className="w-4 h-4 me-2" />
          Use this model
        </Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-main border-border">
        <div className="flex items-center justify-between p-4 border-b border-border -mb-4">
          <h1 className="text-lg font-semibold text-white">
            {model?.provider.toLowerCase()}
            {" / "}
            {model?.displayName}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-white h-8 w-8 p-0 bg-main hover:bg-main"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-60px)]">
          <div className="w-full lg:w-72 p-4 border-r border-b lg:border-b-0 overflow-y-auto border-border">
            <div className="grid gap-3">
              <div className="font-semibold text-lg text-white">
                Model Details
              </div>
              <ul className="grid gap-3 text-xs text-white">
                {Object.entries(model ?? {})
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span>{formatKey(key)}</span>
                      <span>{formatValue(value)}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <Show condition={(model?.isPro && !isSubscriptionActive) ?? false}>
              <div className="p-3 rounded-lg mt-6 bg-background bg-border">
                <h4 className="text-white font-medium text-sm mb-2">
                  Pro Model
                </h4>
                <p className="text-zinc-300 text-xs mb-3">
                  This model requires a Pro subscription to use.
                </p>
                <SubscriptionModal className="w-full" />
              </div>
            </Show>
            <Show
              condition={!model?.isPro || (model.isPro && isSubscriptionActive)}
            >
              <div className="p-3 rounded-lg mt-6 bg-background bg-border">
                <h4 className="text-white font-medium text-sm mb-2">
                  Try in Chat Playground
                </h4>
                <p className="text-zinc-300 text-xs mb-3">
                  You'll be able to try this model in the chat playground
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary"
                  onClick={() => {
                    router.push(`/playground/${model?._id}`)
                  }}
                >
                  <MessageCircle className="me-2 scale-75" />
                  Chat Playground
                </Button>
              </div>
            </Show>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-3">Get started</h2>
              <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
                Below are example code snippets to use a model in your
                application.
              </p>
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  1. Create/Get an API Key
                </h3>
                <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
                  To authenticate with the model you will need to generate a API
                  key. You can do this by following the steps below:
                </p>
                <div className="rounded-lg p-4 mb-3 border bg-background border-lightborder">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                        <DraftingCompass className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">
                        {brandName} API Key
                      </span>
                      <Badge
                        variant="default"
                        className="text-xs bg-primary hover:bg-primary text-white"
                      >
                        {model?.isPro ? "Pro" : "Free"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white text-xs h-7 bg-transparent bg-primary hover:bg-primary hover:text-white border-lightborder hover:border-lightborder"
                      onClick={(): void => router.push("/settings/apikey")}
                    >
                      <Key className="w-3 h-3 me-1" />
                      Get Key
                    </Button>
                  </div>
                  <p className="text-zinc-400 text-xs">
                    Access AI interfaces and models with your API key. You can
                    use this key to authenticate your requests to the API.
                  </p>
                </div>
                <div className="border rounded-lg p-3 mb-4 bg-background border-lightborder">
                  <p className="text-xs text-secondary">
                    You must add your API Key in x-api-key header
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  2. Use the API
                </h3>
                <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
                  To use the model, you can make API calls to the endpoints
                  provided below. Each endpoint has a sample request and
                  response body to help you get started.
                </p>
                {listAPIRefereneces}
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
