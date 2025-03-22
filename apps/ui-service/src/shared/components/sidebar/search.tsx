"use client"
import { FormEvent, useContext, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { GlobalContext } from "@/context/globalstate.provider"
import Show from "../show"
import { usePathname } from "next/navigation"

export function Search() {
  const [searchString, setSearchString] = useState("")
  const [, dispatch] = useContext(GlobalContext)
  const pathname = usePathname()

  useEffect(() => {
    if (!searchString) {
      dispatch("setSearchQuery", searchString)
    }
  }, [searchString])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch("setSearchQuery", searchString)
  }

  return (
    <Show condition={pathname.includes("catalog")}>
      <form onSubmit={handleSubmit}>
        <Input
          className="bg-background border-border text-white shadow-sm pl-4 md:w-[200px] lg:w-[300px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
          placeholder="Search models ..."
          onChange={(e): void => setSearchString(e.target.value)}
        />
      </form>
    </Show>
  )
}
