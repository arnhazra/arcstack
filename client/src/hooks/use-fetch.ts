"use client"
import axios, { Method } from "axios"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"

export default function useFetch(queryKey: string, queryUrl: string, method: Method, requestBody?: object, isRealtime?: boolean, queryId?: string) {
  const fetchDataFunction = async () => {
    const { data } = await axios({ method, url: queryUrl, data: requestBody })
    return data
  }

  const { error, data, isLoading } = useQuery({
    queryKey: [queryKey, requestBody, queryId],
    queryFn: () => fetchDataFunction(),
    retry: 2,
    retryDelay: 2500,
    refetchOnWindowFocus: isRealtime,
    refetchInterval: isRealtime ? 60000 : false,
    enabled: true,
  })

  if (error) {
    toast.error(`${uiConstants.toastError} fetching ${queryKey}`)
  }

  return { error, data, isLoading }
}