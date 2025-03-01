"use client"
import ky from "ky"
import {
  useSuspenseQuery,
  useQuery as useNormalQuery,
} from "@tanstack/react-query"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import HTTPMethods from "@/shared/constants/http-methods"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"

interface QueryType<T> {
  queryKey: string[]
  queryUrl: string
  method: HTTPMethods
  requestBody?: object
  suspense?: boolean
  enabled?: boolean
}

export default function useQuery<T>({
  queryKey,
  queryUrl,
  method,
  requestBody,
  suspense = true,
  enabled = true,
}: QueryType<T>) {
  const [{ user }] = useContext(GlobalContext)

  const queryFn = async () => {
    const data: any = await ky(queryUrl, {
      method,
      json: requestBody,
      timeout: FETCH_TIMEOUT,
    }).json()
    return data
  }

  return suspense
    ? useSuspenseQuery<T, Error>({
        queryKey,
        queryFn,
        refetchOnWindowFocus: !user.reduceCarbonEmissions,
        refetchInterval: user.reduceCarbonEmissions ? 0 : 30000,
      })
    : useNormalQuery<T, Error>({
        queryKey,
        queryFn,
        refetchOnWindowFocus: !user.reduceCarbonEmissions,
        refetchInterval: user.reduceCarbonEmissions ? 0 : 30000,
        enabled,
      })
}
