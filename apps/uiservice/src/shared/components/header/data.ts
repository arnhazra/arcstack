import { uiConstants } from "@/shared/constants/global-constants"

interface LinkData {
  displayName: string
  link: string
  external?: boolean
  mainLink?: boolean
}

export const generalUserLinks: LinkData[] = [
  {
    displayName: "Models",
    link: "/#models",
  },
  {
    displayName: "Safety",
    link: "/#safety",
  },
  {
    displayName: "Plans",
    link: "/#plans",
  },
  {
    displayName: "Developer",
    link: uiConstants.linkedinUri,
    external: true,
  },
]
