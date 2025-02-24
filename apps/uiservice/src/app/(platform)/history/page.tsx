"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { History } from "@/shared/types"

export default function Page() {
  const history = useQuery<History[]>({
    queryKey: ["list-history"],
    queryUrl: `${endPoints.history}`,
    method: HTTPMethods.GET,
  })

  const renderModels = history?.data?.map((item) => {
    return <DerivedModelCard key={item._id} model={item.derivedModel} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">Your History</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          {renderModels}
        </div>
      </section>
    </div>
  )
}
