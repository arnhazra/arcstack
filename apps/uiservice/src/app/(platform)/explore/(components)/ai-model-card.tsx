import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Brain, Eye, Heart } from "lucide-react"
import Link from "next/link"

interface AIModelCardProps {
  id: string
  displayName: string
  category: string
  promptStyle: string
  responseFormat: string
  viewCount: number
  favoriteCount: number
  isFineTuned: string
}

export function AIModelCard({
  id,
  displayName,
  category,
  promptStyle,
  responseFormat,
  viewCount,
  favoriteCount,
  isFineTuned,
}: AIModelCardProps) {
  return (
    <Link href={`/explore/model/${id}`}>
      <Card className="w-64 mx-auto h-[22rem] flex flex-col relative">
        <CardHeader className="flex-shrink-0 pb-2">
          <div className="flex items-start">
            <Brain className="w-8 h-8 text-primary mr-3 mt-1 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <CardTitle
                className="text-lg font-bold truncate"
                title={displayName}
              >
                {displayName}
              </CardTitle>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  <span>{viewCount}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  <span>{favoriteCount}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-2">
          <dl className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <dt className="text-xs font-medium text-slate-600">Category</dt>
              <dd className="text-sm font-semibold">{category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-slate-600">
                Prompt Style
              </dt>
              <dd className="text-sm font-semibold">{promptStyle}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-slate-600">
                Response Format
              </dt>
              <dd className="text-sm font-semibold capitalize">
                {responseFormat}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium text-slate-600">Fine Tuned</dt>
              <dd className="text-sm font-semibold">{isFineTuned}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  )
}
