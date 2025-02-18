"use client"
import { useContext, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { GlobalContext } from "@/context/globalstate.provider"

export function Search() {
  const [searchString, setSearchString] = useState("")
  const [, dispatch] = useContext(GlobalContext)

  useEffect(() => {
    setTimeout(() => {
      dispatch("setSearchQuery", searchString)
    }, 1700)
  }, [searchString])

  return (
    <Input
      className="bg-zinc-800 border-none text-white shadow-sm pl-4 sm:w-[200px] md:w-[200px] lg:w-[300px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
      placeholder="Search models ..."
      onChange={(e): void => setSearchString(e.target.value)}
    />
  )
}
