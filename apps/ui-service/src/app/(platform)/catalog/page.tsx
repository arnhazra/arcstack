"use client"
import { Button } from "@/shared/components/ui/button"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Filter, SortAsc } from "lucide-react"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { BaseModelCard } from "@/shared/components/modelcard"
import { BaseModel, FilterAndSortOptions } from "@/shared/types"
import { AppContext } from "@/context/appstate.provider"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import Show from "@/shared/components/show"
import ErrorPage from "@/app/error"

export interface FindModelRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ searchQuery }, dispatch] = useContext(AppContext)
  const observer = useRef<IntersectionObserver>(null)
  const [findModelRequestState, setFindModelRequestState] =
    useState<FindModelRequestState>({
      selectedFilter: "All",
      selectedSortOption: "displayName",
      offset: 0,
    })
  const filtersAndSortOptions = useQuery<FilterAndSortOptions>({
    queryKey: ["filter-and-sort-options"],
    queryUrl: endPoints.getBaseModelFilterAndSortOptions,
    method: HTTPMethods.GET,
  })

  const models = useSuspenseInfiniteQuery<BaseModel[], Error>({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      searchQuery,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(endPoints.getBaseModels, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedFilter: findModelRequestState.selectedFilter,
          selectedSortOption: findModelRequestState.selectedSortOption,
          offset: pageParam,
          searchQuery,
        }),
      })

      if (!res.ok) throw new Error("Failed to fetch models")
      return res.json()
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 15) return undefined
      return allPages.length * 15
    },
  })

  const lastModelRef = useCallback(
    (node: HTMLDivElement) => {
      if (models.isFetchingNextPage) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && models.hasNextPage) {
          models.fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [models.isFetchingNextPage, models.hasNextPage]
  )

  useEffect(() => {
    if (!searchQuery) models.refetch()
  }, [searchQuery])

  const renderFilters = filtersAndSortOptions?.data?.filters?.map((item) => {
    return (
      <DropdownMenuCheckboxItem
        key={item}
        checked={findModelRequestState.selectedFilter === item}
        onClick={(): void => {
          setFindModelRequestState({
            ...findModelRequestState,
            selectedFilter: item,
            offset: 0,
          })
          dispatch("setSearchQuery", "")
        }}
      >
        {item}
      </DropdownMenuCheckboxItem>
    )
  })

  const renderSortOptions = filtersAndSortOptions?.data?.sortOptions?.map(
    (item) => {
      return (
        <DropdownMenuCheckboxItem
          key={item.value}
          checked={findModelRequestState.selectedSortOption === item.value}
          onClick={(): void =>
            setFindModelRequestState({
              ...findModelRequestState,
              selectedSortOption: item.value,
              offset: 0,
            })
          }
        >
          {item.label}
        </DropdownMenuCheckboxItem>
      )
    }
  )

  console.log(models.data)

  const renderModels = models.data?.pages.flat().map((model, idx, arr) => {
    if (idx === arr.length - 1) {
      return (
        <div ref={lastModelRef} key={model._id}>
          <BaseModelCard model={model} />
        </div>
      )
    }
    return <BaseModelCard key={model._id} model={model} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">
            <Show condition={findModelRequestState.selectedFilter === "All"}>
              All Models
            </Show>
            <Show condition={findModelRequestState.selectedFilter !== "All"}>
              Models from {findModelRequestState.selectedFilter}
            </Show>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 gap-1 bg-border hover:bg-border"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Provider</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background border-border text-white"
              >
                <DropdownMenuLabel>Select Provider</DropdownMenuLabel>
                {renderFilters}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 gap-1 bg-border hover:bg-border"
                >
                  <SortAsc className="h-3.5 w-3.5" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background border-border text-white"
              >
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                {renderSortOptions}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 py-4">
          <Show condition={models.data?.pages.flat().length === 0}>
            <ErrorPage
              error={{
                name: "404",
                message:
                  "Seems like there is no model available with this keyword",
              }}
            />
          </Show>
          {renderModels}
        </div>
      </section>
    </div>
  )
}
