"use client"
import { BookMarked, Copy, Medal } from "lucide-react"
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: modelId = "" } = use(params)
  const router = useRouter()
  const model: UseQueryResult<DerivedModel, Error> = useFetch({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getDerivedModel}/${modelId}`,
    method: HTTPMethods.GET,
  })

  const renderModelTags = model?.data?.description
    ?.split(" ")
    .slice(0, 30)
    .map((item: string, index: number) => {
      if (item.length > 5) {
        return (
          <Badge className="me-2 mb-2" variant="outline" key={index}>
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

  const dataQuality = (rating: number): string => {
    if (rating > 4.5) return "Gold"
    if (rating > 4.0) return "Silver"
    return "Bronze"
  }

  return (
    <Show condition={!model.isLoading} fallback={<Loading />}>
      <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2 pb-4 bg-zinc-900 text-white border-zinc-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between">
                  {model?.data?.displayName}
                  <ActivityLog keyword={modelId} />
                </CardTitle>
                <CardDescription className="max-w-lg justify-normal text-white">
                  {model?.data?.description.slice(0, 200)}...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <p className="text-xl ms-1 -mb-2 -mt-2">Related Models</p>
          {/* <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            {renderRelatedModels}
          </div> */}
        </div>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {model?.data?.displayName}
              </CardTitle>
              <CardDescription>{model?.data?.category}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1"
                onClick={copyModelId}
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Copy Model Id
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold text-lg">Model Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Model Rating</span>
                  <span>{model?.data?.baseModel.architecture}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Volume</span>
                  <span>{model?.data?.baseModel.genericName}</span>
                </li>
                {/* <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Quality</span>
                  <span>
                    <Show condition={model?.data?.metaData?.rating >= 4.5}>
                      <Badge variant="default" key={"gold"}>
                        <Medal className="scale-50" />
                        Gold
                      </Badge>
                    </Show>
                    <Show
                      condition={
                        model?.data?.metaData?.rating >= 4.0 &&
                        model?.data?.metaData?.rating < 4.5
                      }
                    >
                      <Badge variant="secondary" key={"silver"}>
                        <Medal className="scale-50" />
                        Silver
                      </Badge>
                    </Show>
                    <Show condition={model?.data?.metaData?.rating < 4.0}>
                      <Badge variant="outline" key={"bronze"}>
                        <Medal className="scale-50" />
                        Bronze
                      </Badge>
                    </Show>
                  </span>
                </li> */}
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold text-lg">Model Tags</div>
              <div>{renderModelTags}</div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center bg-muted/50 px-6 py-3">
            <Button
              variant="default"
              className="w-full"
              onClick={(): void => router.push("/apireference/datamarketplace")}
            >
              Data API Reference
              <BookMarked className="scale-75" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Show>
  )
}
