"use client"
import { Bell, Bookmark, BookMarked, MessageCircle } from "lucide-react"
import { Badge } from "@/shared/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import useQuery from "@/shared/hooks/use-query"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import Show from "@/shared/components/show"
import ActivityLog from "@/shared/components/activity"
import { use, useEffect, useState } from "react"
import { BaseModel } from "@/shared/types"
import { BaseModelCard } from "@/shared/components/modelcard"
import Error from "@/app/error"
import Share from "@/shared/components/share"
import ky from "ky"
import { toast } from "sonner"
import { uiConstants } from "@/shared/constants/global-constants"
import UseThisModelModal from "@/shared/components/usemodelmodal"
import {
  excludedKeys,
  formatKey,
  formatValue,
} from "@/shared/lib/format-key-value"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: modelId = "" } = use(params)
  const [icCollected, setIsCollected] = useState(false)
  const model = useQuery<BaseModel>({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getOneBaseModel}/${modelId}`,
    method: HTTPMethods.GET,
  })

  const collectionCheck = useQuery<{ isCollected: boolean }>({
    queryKey: ["is-collected", modelId ?? ""],
    queryUrl: `${endPoints.collections}/${modelId}`,
    method: HTTPMethods.GET,
  })

  const relatedModels = useQuery<BaseModel[]>({
    queryKey: ["related-models", model?.data?.provider as any],
    queryUrl: endPoints.getBaseModels,
    method: HTTPMethods.POST,
    requestBody: {
      searchQuery: "",
      selectedFilter: model?.data?.provider,
      selectedSortOption: "displayName",
      offset: 0,
    },
  })

  useEffect(() => {
    setIsCollected(collectionCheck.data?.isCollected ?? false)
  }, [collectionCheck.data])

  const renderModelTags = model?.data?.description
    ?.split(" ")
    .slice(0, 30)
    .map((item: string, index: number) => {
      if (item.length > 5) {
        return (
          <Badge
            className="me-2 mb-2 bg-border hover:bg-border ps-2 pe-2 pt-1 pb-1"
            variant="default"
            key={index}
          >
            {item}
          </Badge>
        )
      }
    })

  const renderRelatedModels = relatedModels?.data?.map((model) => {
    return <BaseModelCard key={model._id} model={model} />
  })

  const toggleCollect = async (): Promise<void> => {
    try {
      setIsCollected(!icCollected)
      if (icCollected) {
        await ky.delete(`${endPoints.collections}/${modelId}`)
      } else {
        await ky.post(`${endPoints.collections}/${modelId}`)
      }
    } catch (error) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.connectionErrorMessage,
      })
    }
  }

  return (
    <Show condition={!model.error && !relatedModels.error} fallback={<Error />}>
      <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <Card className="overflow-hidden bg-background text-white border-border lg:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-start">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {model?.data?.displayName}
              </CardTitle>
              <CardDescription className="text-white">
                {model?.data?.provider}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Share />
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold text-lg">Model Details</div>
              <ul className="grid gap-3">
                {Object.entries(model.data ?? {})
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span>{formatKey(key)}</span>
                      <span>{formatValue(value)}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <Separator className="my-4 bg-border" />
            <div className="grid gap-3">
              <div className="font-semibold text-lg">Model Tags</div>
              <div>{renderModelTags}</div>
            </div>
          </CardContent>
        </Card>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-4 pb-4 text-white bg-background border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex flex-wrap justify-between">
                  {model?.data?.provider.toLowerCase()}
                  {" / "}
                  {model?.data?.displayName}
                  <div className="flex gap-4">
                    <ActivityLog keyword={modelId} />
                    <Show condition={!!model?.data?.isPro}>
                      <Badge className="bg-primary hover:bg-primary">Pro</Badge>
                    </Show>
                  </div>
                </CardTitle>
                <CardDescription className="w-full text-zinc-200">
                  {model?.data?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between gap-4 mt-4 -mb-4">
                <UseThisModelModal model={model.data} />
                <Bookmark
                  fill={icCollected ? "#1db954" : "#18181b"}
                  className="mt-3 text-primary cursor-pointer"
                  onClick={toggleCollect}
                />
              </CardContent>
            </Card>
          </div>
          <p className="text-xl ms-1 -mb-4 -mt-2 text-white">
            Models From {model?.data?.provider}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
            {renderRelatedModels}
          </div>
        </div>
      </div>
    </Show>
  )
}
