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
import { DerivedModelCard } from "@/shared/components/modelcard"
import { DerivedModel, FilterAndSortOptions } from "@/shared/types"
import { GlobalContext } from "@/context/globalstate.provider"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"

export interface FindModelRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ searchQuery }, dispatch] = useContext(GlobalContext)
  const loaderRef = useRef(null)
  const observer = useRef<IntersectionObserver>(null)
  const [findModelRequestState, setFindModelRequestState] =
    useState<FindModelRequestState>({
      selectedFilter: "All",
      selectedSortOption: "displayName",
      offset: 0,
    })
  const filtersAndSortOptions = useQuery<FilterAndSortOptions>({
    queryKey: ["filter-and-sort-options"],
    queryUrl: endPoints.getDerivedModelFilterAndSortOptions,
    method: HTTPMethods.GET,
  })

  const models = useSuspenseInfiniteQuery<DerivedModel[], Error>({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      searchQuery,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(endPoints.getDerivedModels, {
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
    initialPageParam: 0, // ✅ required to fix the error
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 30) return undefined // no more data
      return allPages.length * 30
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

  const renderModels = models.data?.pages.flat().map((model, idx, arr) => {
    if (idx === arr.length - 1) {
      return (
        <div ref={lastModelRef} key={model._id}>
          <DerivedModelCard model={model} />
        </div>
      )
    }
    return <DerivedModelCard key={model._id} model={model} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <div className="flex">
          <p className="text-white text-lg">
            {findModelRequestState.selectedFilter} Models
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
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background border-border text-white"
              >
                <DropdownMenuLabel>Filter Category</DropdownMenuLabel>
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
          {renderModels}
        </div>
      </section>
    </div>
  )
}
