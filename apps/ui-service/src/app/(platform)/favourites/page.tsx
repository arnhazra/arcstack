"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { Favourites } from "@/shared/types"

export default function Page() {
  const favourites = useQuery<Favourites[]>({
    queryKey: ["list-favourited"],
    queryUrl: `${endPoints.favourites}`,
    method: HTTPMethods.GET,
  })

  const renderModels = favourites?.data?.map((favourite) => {
    if (!favourite.derivedModel) return null
    return (
      <DerivedModelCard key={favourite._id} model={favourite.derivedModel} />
    )
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">Your Favourites</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          {renderModels}
        </div>
      </section>
    </div>
  )
}
