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
import { ChevronLeft, ChevronRight, SortAsc, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/shared/components/ui/input"
import { AIModelCard } from "./(components)/ai-model-card"
import Loading from "@/app/loading"
import { Badge } from "@/shared/components/ui/badge"

export interface FindModelRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const router = useRouter()
  const [findModelRequestState, setFindModelRequestState] =
    useState<FindModelRequestState>({
      searchQuery: "",
      selectedFilter: "All",
      selectedSortOption: "name",
      offset: 0,
    })
  const filtersAndSortOptions = useFetch({
    queryKey: ["filters-and-sorts"],
    queryUrl: endPoints.accesskey,
    method: HTTPMethods.GET,
  })
  const models = useFetch({
    queryKey: [
      "models-listings",
      findModelRequestState.selectedFilter,
      findModelRequestState.selectedSortOption,
      String(findModelRequestState.offset),
    ],
    queryUrl: endPoints.modelsListings,
    method: HTTPMethods.POST,
    requestBody: findModelRequestState,
  })

  useEffect(() => {
    if (!findModelRequestState.searchQuery) models.refetch()
  }, [findModelRequestState.searchQuery])

  const renderFilterTabs = filtersAndSortOptions?.data?.filters?.map(
    (item: string) => {
      return (
        <div
          key={item}
          className={`cursor-pointer flex capitalize ${
            findModelRequestState.selectedFilter === item
              ? ""
              : "text-slate-500"
          }`}
          onClick={(): void =>
            setFindModelRequestState({
              ...findModelRequestState,
              selectedFilter: item,
              offset: 0,
              searchQuery: "",
            })
          }
        >
          <Badge>{item}</Badge>
        </div>
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

  const renderModels = models?.data?.map((model: any) => {
    return (
      <AIModelCard
        key={model._id}
        id={model._id}
        displayName={model.displayName}
        category={model.category}
        promptStyle={model.promptStyle}
        responseFormat={model.responseFormat}
        viewCount={1234}
        favoriteCount={567}
        isFineTuned={model.isFineTuned ? "Yes" : "No"}
      />
    )
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
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm">{renderFilterTabs}</nav>
        <div>
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                models.refetch()
              }}
            >
              <div className="relative">
                <Sparkles className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  defaultValue={findModelRequestState.searchQuery}
                  onChange={(e): void =>
                    setFindModelRequestState({
                      ...findModelRequestState,
                      searchQuery: e.target.value,
                    })
                  }
                  type="search"
                  placeholder="Type anything and press enter to find models"
                  className="mb-4 pl-8 w-full h-12 focus:outline-none"
                />
              </div>
            </form>
          </div>
          <section className="grid gap-6 mb-4">
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
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
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
      </div>
    </Show>
  )
}
