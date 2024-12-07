"use client"
import ky from "ky"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import HTTPMethods from "@/shared/constants/http-methods"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"

interface QueryType {
  queryKey: string[]
  queryUrl: string
  method: HTTPMethods
  requestBody?: object
}

export default function useFetch({
  queryKey,
  queryUrl,
  method,
  requestBody,
}: QueryType) {
  const [{ user }] = useContext(GlobalContext)

  const queryFn = async () => {
    const data: any = await ky(queryUrl, {
      method,
      json: requestBody,
      timeout: FETCH_TIMEOUT,
    }).json()
    return data
  }

  return useQuery({
    queryKey,
    queryFn,
    refetchInterval: user.reduceCarbonEmissions ? 0 : 30000,
  })
}
