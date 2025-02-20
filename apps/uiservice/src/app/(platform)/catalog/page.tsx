"use client"
import Show from "@/shared/components/show"
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
import { ChevronLeft, ChevronRight, SortAsc } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import Loading from "@/app/loading"
import { Badge } from "@/shared/components/ui/badge"
import { DerivedModelCard } from "@/shared/components/modelcard"
import { DerivedModel, FilterAndSortOptions } from "@/shared/types"
import { GlobalContext } from "@/context/globalstate.provider"
import { UseQueryResult } from "@tanstack/react-query"

export interface FindModelRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ searchQuery }] = useContext(GlobalContext)
  const [findModelRequestState, setFindModelRequestState] =
    useState<FindModelRequestState>({
      searchQuery: searchQuery ?? "",
      selectedFilter: "All",
      selectedSortOption: "-_id",
      offset: 0,
    })
  const filtersAndSortOptions: UseQueryResult<FilterAndSortOptions, Error> =
    useQuery({
      queryKey: ["filter-and-sort-options"],
      queryUrl: endPoints.getDerivedModelFilterAndSortOptions,
      method: HTTPMethods.GET,
    })

  useEffect(() => {
    setFindModelRequestState({ ...findModelRequestState, searchQuery })
  }, [searchQuery])

  const models = useQuery({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      String(findModelRequestState.offset),
      searchQuery,
    ],
    queryUrl: endPoints.getDerivedModels,
    method: HTTPMethods.POST,
    requestBody: findModelRequestState,
  })

  useEffect(() => {
    if (!findModelRequestState.searchQuery) models.refetch()
  }, [findModelRequestState.searchQuery])

  const renderFilters = filtersAndSortOptions?.data?.filters?.map((item) => {
    return (
      <Badge
        key={item}
        className={
          findModelRequestState.selectedFilter === item
            ? "mr-2 p-2 ps-6 pe-6 cursor-pointer"
            : "mr-2 p-2 ps-6 pe-6 cursor-pointer bg-background hover:bg-border"
        }
        variant={
          findModelRequestState.selectedFilter === item
            ? "secondary"
            : "default"
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

  const renderModels = models?.data?.map((model: DerivedModel) => {
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
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 gap-1 bg-background hover:bg-background"
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 py-4">
            {renderModels}
          </div>
        </section>
        <Show condition={!findModelRequestState.searchQuery}>
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
        </Show>
      </div>
    </Show>
  )
}
