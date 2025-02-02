"use client"
import Show from "@/shared/components/show"
import { Button } from "@/shared/components/ui/button"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useFetch from "@/shared/hooks/use-fetch"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, SortAsc } from "lucide-react"
import { useEffect, useState } from "react"
import Loading from "@/app/loading"
import { Badge } from "@/shared/components/ui/badge"
import { ModelCard } from "@/shared/components/modelcard"
import { DerivedModel } from "@/shared/types"

export interface FindModelRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [findModelRequestState, setFindModelRequestState] =
    useState<FindModelRequestState>({
      searchQuery: "",
      selectedFilter: "All",
      selectedSortOption: "displayName",
      offset: 0,
    })
  const filtersAndSortOptions = useFetch({
    queryKey: ["filter-and-sort-options"],
    queryUrl: endPoints.getDerivedModelFilterAndSortOptions,
    method: HTTPMethods.GET,
  })
  const models = useFetch({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      String(findModelRequestState.offset),
    ],
    queryUrl: endPoints.getDerivedModels,
    method: HTTPMethods.POST,
    requestBody: findModelRequestState,
  })

  useEffect(() => {
    if (!findModelRequestState.searchQuery) models.refetch()
  }, [findModelRequestState.searchQuery])

  const renderFilters = filtersAndSortOptions?.data?.filters?.map(
    (item: string) => {
      return (
        <Badge
          key={item}
          className="mr-2 p-2 ps-6 pe-6 cursor-pointer"
          variant={
            findModelRequestState.selectedFilter === item
              ? "default"
              : "outline"
          }
          onClick={(): void =>
            setFindModelRequestState({
              ...findModelRequestState,
              selectedFilter: item,
              offset: 0,
              searchQuery: "",
            })
          }
        >
          {item}
        </Badge>
      )
    }
  )

  const renderSortOptions = filtersAndSortOptions?.data?.sortOptions?.map(
    (item: any) => {
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

  const renderModels = models?.data?.map((model: DerivedModel) => {
    return <ModelCard key={model._id} model={model} />
  })

  const prevPage = () => {
    const prevModelReqNumber = findModelRequestState.offset - 30
    setFindModelRequestState({
      ...findModelRequestState,
      offset: prevModelReqNumber,
    })
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    const nextOffset = findModelRequestState.offset + 30
    setFindModelRequestState({ ...findModelRequestState, offset: nextOffset })
    window.scrollTo(0, 0)
  }

  return (
    <Show
      condition={!filtersAndSortOptions.isLoading && !models.isLoading}
      fallback={<Loading />}
    >
      <div className="mx-auto grid w-full items-start gap-6">
        <section>
          <div className="flex">
            <div>{renderFilters}</div>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <SortAsc className="h-3.5 w-3.5" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {renderSortOptions}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 py-4">
            {renderModels}
          </div>
        </section>
        <Show condition={!findModelRequestState.searchQuery}>
          <Button
            disabled={findModelRequestState.offset === 0}
            variant="outline"
            onClick={prevPage}
            size="icon"
            className="me-2"
          >
            <ChevronLeft className="scale-75" />
          </Button>
          <Button
            disabled={models?.data?.length !== 30}
            variant="outline"
            onClick={nextPage}
            size="icon"
          >
            <ChevronRight className="scale-75" />
          </Button>
        </Show>
      </div>
    </Show>
  )
}
