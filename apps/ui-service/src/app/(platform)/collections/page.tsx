"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { Collections } from "@/shared/types"

export default function Page() {
  const collections = useQuery<Collections[]>({
    queryKey: ["list-collections"],
    queryUrl: `${endPoints.collections}`,
    method: HTTPMethods.GET,
  })

  const renderModels = collections?.data?.map((item) => {
    if (!item.derivedModel) return null
    return <DerivedModelCard key={item._id} model={item.derivedModel} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">Your Collections</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          {renderModels}
        </div>
      </section>
    </div>
  )
}
