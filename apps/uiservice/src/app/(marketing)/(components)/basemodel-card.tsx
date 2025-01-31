import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { BaseModel } from "@/shared/types"
import { Brain, Eye, Heart } from "lucide-react"

interface AIBaseModelCardProps {
  model: BaseModel
}

export function AIBaseModelCard({ model }: AIBaseModelCardProps) {
  return (
    <Card
      key={model._id}
      className="w-64 mx-auto h-[22rem] flex flex-col relative"
    >
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-start">
          <Brain className="w-8 h-8 mr-3 mt-1 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <CardTitle
              className="text-lg font-bold truncate"
              title={model.displayName}
            >
              {model.displayName}
            </CardTitle>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{1234}</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                <span>{567}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <dl className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <dt className="text-xs font-medium text-slate-600">Architecture</dt>
            <dd className="text-sm font-semibold">{model.architecture}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-slate-600">Vendor</dt>
            <dd className="text-sm font-semibold">{model.vendor}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-slate-600">Series</dt>
            <dd className="text-sm font-semibold capitalize">{model.series}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-slate-600">Parameters</dt>
            <dd className="text-sm font-semibold">{model.parameters}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
