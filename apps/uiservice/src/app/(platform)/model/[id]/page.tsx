"use client"
import { BookMarked, FlaskConical } from "lucide-react"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { useRouter } from "next/navigation"
import useFetch from "@/shared/hooks/use-fetch"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import Show from "@/shared/components/show"
import { toast } from "@/shared/components/ui/use-toast"
import { uiConstants } from "@/shared/constants/global-constants"
import ActivityLog from "@/shared/components/activity"
import { use } from "react"
import Loading from "@/app/loading"
import { UseQueryResult } from "@tanstack/react-query"
import { DerivedModel } from "@/shared/types"
import { ModelCard } from "@/shared/components/modelcard"
import Error from "@/app/error"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: modelId = "" } = use(params)
  const router = useRouter()
  const model: UseQueryResult<DerivedModel, Error> = useFetch({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getOneDerivedModel}/${modelId}`,
    method: HTTPMethods.GET,
  })

  const relatedModels: UseQueryResult<DerivedModel[], Error> = useFetch({
    queryKey: ["related-models", model?.data?.category as any],
    queryUrl: endPoints.getDerivedModels,
    method: HTTPMethods.POST,
    requestBody: {
      searchQuery: "",
      selectedFilter: model?.data?.category,
      selectedSortOption: "displayName",
      offset: 0,
    },
  })

  const renderModelTags = model?.data?.description
    ?.split(" ")
    .slice(0, 30)
    .map((item: string, index: number) => {
      if (item.length > 5) {
        return (
          <Badge
            className="me-2 mb-2 bg-zinc-800 hover:bg-zinc-800 ps-2 pe-2 pt-1 pb-1"
            variant="default"
            key={index}
          >
            {item}
          </Badge>
        )
      }
    })

  const copyModelId = () => {
    navigator.clipboard.writeText(modelId ?? "")
    toast({
      title: uiConstants.notification,
      description: (
        <p className="text-zinc-600">{uiConstants.copiedToClipBoard}</p>
      ),
    })
  }

  const renderRelatedModels = relatedModels?.data?.map((model) => {
    return <ModelCard key={model._id} model={model} />
  })

  return (
    <Show
      condition={!model.isLoading && !relatedModels.isLoading}
      fallback={<Loading />}
    >
      <Show
        condition={!model.error && !relatedModels.error}
        fallback={<Error />}
      >
        <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-4 pb-4 text-white bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex flex-wrap justify-between">
                    {model?.data?.displayName}
                    <div className="flex gap-4">
                      <ActivityLog keyword={modelId} />
                      <Show condition={!!model?.data?.isPro}>
                        <Badge className="bg-lime-500">Pro</Badge>
                      </Show>
                    </div>
                  </CardTitle>
                  <CardDescription className="w-full text-zinc-200">
                    {model?.data?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4 mt-4 -mb-4">
                  <Button
                    size="sm"
                    className="bg-lime-500 hover:bg-lime-500"
                    onClick={(): void => router.push(`/playground/${modelId}`)}
                  >
                    <FlaskConical className="me-2 scale-75" />
                    Open Playground
                  </Button>
                </CardContent>
              </Card>
            </div>
            <p className="text-xl ms-1 -mb-4 -mt-2 text-white">
              Related Models
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 py-4">
              {renderRelatedModels}
            </div>
          </div>
          <Card className="overflow-hidden bg-zinc-900 text-white border-zinc-800">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {model?.data?.displayName}
                </CardTitle>
                <CardDescription className="text-white">
                  {model?.data?.category}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold text-lg">Model Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Architecture</span>
                    <span>{model?.data?.baseModel.architecture}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vendor</span>
                    <span>{model?.data?.baseModel.vendor}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Base Model</span>
                    <span>{model?.data?.baseModel.displayName}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Series</span>
                    <span>{model?.data?.baseModel.series}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Context Window
                    </span>
                    <span>{model?.data?.baseModel.contextWindow}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Default Temerature
                    </span>
                    <span>{model?.data?.baseModel.defaultTemperature}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Default Top P</span>
                    <span>{model?.data?.baseModel.defaultTopP}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Parameters</span>
                    <span>{model?.data?.baseModel.parameters}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Generic Name</span>
                    <span>{model?.data?.baseModel.genericName}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fine Tuned</span>
                    <span>{model?.data?.isFineTuned ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Response Format
                    </span>
                    <span>{model?.data?.responseFormat}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4 bg-zinc-800" />
              <div className="grid gap-3">
                <div className="font-semibold text-lg">Model Tags</div>
                <div>{renderModelTags}</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center bg-muted/50 px-6 py-3">
              <Button
                variant="default"
                className="w-full bg-zinc-800 hover:bg-zinc-800"
                onClick={(): void => router.push(`/apireference/${modelId}`)}
              >
                Data API Reference
                <BookMarked className="scale-75" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Show>
    </Show>
  )
}
