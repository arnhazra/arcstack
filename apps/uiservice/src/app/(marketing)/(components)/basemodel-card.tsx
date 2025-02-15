import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { BaseModel } from "@/shared/types"
import { Brain, CircleFadingPlus, Variable } from "lucide-react"

interface AIBaseModelCardProps {
  model: BaseModel
}

export function AIBaseModelCard({ model }: AIBaseModelCardProps) {
  return (
    <Card
      key={model._id}
      className="w-64 mx-auto h-[23rem] flex flex-col relative bg-zinc-900 text-white border-zinc-800 cursor-pointer"
    >
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-start">
          <Brain className="w-8 h-8 mr-3 mt-1 flex-shrink-0 text-lime-500" />
          <div className="flex flex-col min-w-0">
            <CardTitle
              className="text-lg font-bold truncate"
              title={model.displayName}
            >
              {model.displayName}
            </CardTitle>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <div className="flex items-center">
                <CircleFadingPlus className="w-3 h-3 mr-1 text-lime-500" />
                <span>{model.contextWindow}</span>
              </div>
              <div className="flex items-center">
                <Variable className="w-3 h-3 mr-1 text-red-400" />
                <span>{model.parameters}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <dl className="grid gap-3">
          <div className="space-y-1">
            <dt className="text-xs font-medium text-zinc-300">Architecture</dt>
            <dd className="text-sm font-semibold">{model.architecture}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-zinc-300">Vendor</dt>
            <dd className="text-sm font-semibold">{model.vendor}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-zinc-300">Series</dt>
            <dd className="text-sm font-semibold capitalize">{model.series}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-zinc-300">Generic Name</dt>
            <dd className="text-sm font-semibold">{model.genericName}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-zinc-300">
              Default Temperature
            </dt>
            <dd className="text-sm font-semibold">
              {model.defaultTemperature}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
