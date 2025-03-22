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
import { ChevronLeft, ChevronRight, Filter, SortAsc } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { DerivedModel, FilterAndSortOptions } from "@/shared/types"
import { GlobalContext } from "@/context/globalstate.provider"

export interface FindModelRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ searchQuery }, dispatch] = useContext(GlobalContext)
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

  const models = useQuery<DerivedModel[]>({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      String(findModelRequestState.offset),
      searchQuery,
    ],
    queryUrl: endPoints.getDerivedModels,
    method: HTTPMethods.POST,
    requestBody: { ...findModelRequestState, searchQuery },
  })

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

  const renderModels = models?.data?.map((model) => {
    return <DerivedModelCard key={model._id} model={model} />
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
      <div className="flex gap-4">
        <Button
          disabled={findModelRequestState.offset === 0}
          variant="default"
          onClick={prevPage}
          size="icon"
          className="rounded-full bg-primary hover:bg-primary"
        >
          <ChevronLeft className="scale-75" />
        </Button>
        <Button
          disabled={models?.data?.length !== 30}
          variant="default"
          onClick={nextPage}
          size="icon"
          className="rounded-full bg-primary hover:bg-primary"
        >
          <ChevronRight className="scale-75" />
        </Button>
      </div>
    </div>
  )
}
