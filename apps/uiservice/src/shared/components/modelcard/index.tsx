import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { DerivedModel } from "@/shared/types"
import { Brain, Heart } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import ActivityLog from "../activity"

interface ModelProps {
  model: DerivedModel
}

export function ModelCard({ model }: ModelProps) {
  const { _id, baseModel, category, displayName, isFineTuned, isPro } = model

  return (
    <Link href={`/model/${_id}`}>
      <Card className="w-full max-w-xs mx-auto h-[23rem] flex flex-col relative hover:shadow-md transition-shadow bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-start">
            <Brain className="w-8 h-8 text-primary mr-3 mt-1 text-lime-300" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-2">
                <CardTitle
                  className="text-lg font-bold truncate"
                  title={displayName}
                >
                  {displayName}
                </CardTitle>
                {isPro && <Badge className="bg-lime-500">Pro</Badge>}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <ActivityLog keyword={_id} />
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1 text-red-400" />
                  <span>567</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-2">
          <dl className="grid gap-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Category</dt>
              <dd className="text-sm font-semibold">{category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Base Model</dt>
              <dd className="text-sm font-semibold capitalize">
                {baseModel.displayName}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Parameters</dt>
              <dd className="text-sm font-semibold capitalize">
                {baseModel.parameters}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">
                Architecture
              </dt>
              <dd className="text-sm font-semibold">
                {baseModel.architecture}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-zinc-300">Fine Tuned</dt>
              <dd className="text-sm font-semibold">
                {isFineTuned ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  )
}
