"use client"
import SnippetPanel from "@/shared/components/snippet"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { APIReference } from "@/shared/types"
import { UseQueryResult } from "@tanstack/react-query"

export default function Page() {
  const apiReference: UseQueryResult<APIReference[], Error> = useQuery({
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
