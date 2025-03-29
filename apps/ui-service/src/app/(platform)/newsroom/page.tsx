"use client"
import { GlobalContext } from "@/context/globalstate.provider"
import { ArticleCard } from "@/shared/components/articlecard"
import { SubscriptionModal } from "@/shared/components/subscriptionmodal"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { FindNewsResponse } from "@/shared/types"
import { useContext } from "react"

export default function Page() {
  const [{ isSubscriptionActive }] = useContext(GlobalContext)
  const news = useQuery<FindNewsResponse>({
    queryKey: ["newsroom"],
    queryUrl: `${endPoints.newsroom}`,
    method: HTTPMethods.GET,
  })

  const renderArticles = news?.data?.articles?.map((article, index) => {
    return <ArticleCard article={article} key={index} />
  })

  return (
    <>
      <SubscriptionModal
        open={!isSubscriptionActive}
        customMessage="You need Pro subscription to access newsroom"
        onOpenChange={(): void => undefined}
      />
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
    </>
  )
}
