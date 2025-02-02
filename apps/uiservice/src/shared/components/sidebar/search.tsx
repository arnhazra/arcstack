"use client"
import { Input } from "../ui/input"

export function Search() {
  return (
    <Input
      className="bg-zinc-900 border-none text-white shadow-sm pl-4 sm:w-[200px] md:w-[200px] lg:w-[250px] flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
      placeholder="Search models ..."
    />
  )
}
