"use client"
import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Article } from "@/shared/types"
import { uiConstants } from "@/shared/constants/global-constants"

export function ArticleCard({ article }: { article: Article }) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const formattedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null

  return (
    <Card className="w-full max-w-xs mx-auto h-[23rem] flex flex-col relative hover:shadow-md transition-shadow bg-background border-border text-white">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {article.urlToImage && !imageError ? (
          <img
            src={article.urlToImage}
            alt={article.title || "News image"}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-t-md"
            onError={handleImageError}
          />
        ) : (
          <img
            src={uiConstants.fallbackImageURL}
            alt={article.title || "News image"}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-t-md"
          />
        )}
        {article.source?.name && (
          <Badge className="absolute top-2 left-2 bg-primary/80 hover:bg-primary">
            {article.source.name}
          </Badge>
        )}
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2 text-xl">
          {article.title || "Untitled"}
        </CardTitle>
        <CardDescription className="line-clamp-3 mt-2 text-zinc-300">
          {article.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {article.url && (
          <Button
            variant="default"
            asChild
            className="w-full gap-2 bg-border hover:bg-border"
          >
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              Read full article
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
