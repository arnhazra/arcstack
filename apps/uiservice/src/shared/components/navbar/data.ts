import { brandName, uiConstants } from "@/shared/constants/global-constants"

interface LinkData {
  displayName: string
  link: string
  external?: boolean
  mainLink?: boolean
}

export const generalUserLinks: LinkData[] = [
  {
    displayName: brandName,
    link: "/explore",
    mainLink: true,
  },
  {
    displayName: "Favourites",
    link: "/favourites",
  },
  {
    displayName: "NewsRoom",
    link: "/newsroom",
  },
  {
    displayName: "API Reference",
    link: "/apireference",
  },
  {
    displayName: "ArcStack One",
    link: "/arcstackone",
  },
]
