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
    link: "/",
    mainLink: true,
  },
  {
    displayName: "Models",
    link: "/#models",
  },
  {
    displayName: "Safety",
    link: "/#safety",
  },
  {
    displayName: "Pricing",
    link: "/#pricing",
  },
  {
    displayName: "Developer",
    link: uiConstants.linkedinUri,
    external: true,
  },
]
