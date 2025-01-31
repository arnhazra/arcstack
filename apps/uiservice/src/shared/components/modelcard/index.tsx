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
      <Card className="w-full max-w-xs mx-auto h-[22rem] flex flex-col relative hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start">
            <Brain className="w-8 h-8 text-primary mr-3 mt-1" />
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
          <dl className="grid gap-3">
            <div>
              <dt className="text-xs font-medium text-gray-500">Category</dt>
              <dd className="text-sm font-semibold">{category}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">
                Prompt Style
              </dt>
              <dd className="text-sm font-semibold">{promptStyle}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">
                Response Format
              </dt>
              <dd className="text-sm font-semibold capitalize">
                {responseFormat}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Fine Tuned</dt>
              <dd className="text-sm font-semibold">{isFineTuned}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </Link>
  )
}
