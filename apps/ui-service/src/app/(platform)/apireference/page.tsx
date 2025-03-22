"use client"
import SnippetPanel from "@/shared/components/snippet"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { APIReference } from "@/shared/types"

export default function Page() {
  const apiReference = useQuery<APIReference[]>({
    method: HTTPMethods.GET,
    queryKey: ["get-apireference"],
    queryUrl: endPoints.getapireference,
  })

  const listAPIRefereneces = apiReference?.data?.map((item) => {
    return (
      <SnippetPanel
        key={item.apiName}
        description={item.apiDescription}
        method={item.apiMethod}
        request={item.sampleRequestBody}
        response={item.sampleResponseBody}
        title={item.apiName}
        url={`${apiHost}/${item.apiUri}`}
      />
    )
  })

  return <>{listAPIRefereneces}</>
}
