"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { DerivedModel } from "@/shared/types"

export default function Page() {
  const myBuilds = useQuery<DerivedModel[]>({
    queryKey: ["myBuilds"],
    queryUrl: `${endPoints.getMyBuilds}`,
    method: HTTPMethods.GET,
  })

  const renderModels = myBuilds?.data?.map((build) => {
    return <DerivedModelCard key={build._id} model={build} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">My Builds</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          {renderModels}
        </div>
      </section>
    </div>
  )
}
