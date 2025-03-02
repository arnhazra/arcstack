"use client"
import { NewsCard } from "@/shared/components/articlecard"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { FindNewsResponse } from "@/shared/types"

export default function Page() {
  const news = useQuery<FindNewsResponse>({
    queryKey: ["newsroom"],
    queryUrl: `${endPoints.newsroom}`,
    method: HTTPMethods.GET,
  })

  const renderArticles = news?.data?.articles?.map((article, index) => {
    return <NewsCard article={article} key={index} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">AI newsroom</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          {renderArticles}
        </div>
      </section>
    </div>
  )
}
