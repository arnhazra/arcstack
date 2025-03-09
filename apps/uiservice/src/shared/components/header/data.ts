import { uiConstants } from "@/shared/constants/global-constants"

interface LinkData {
  displayName: string
  link: string
  external?: boolean
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
    displayName: "Explore Pro",
    link: "/#pro",
  },
  {
    displayName: "Developer",
    link: uiConstants.linkedinURI,
    external: true,
  },
  {
    displayName: "Get Started",
    link: "/catalog",
  },
]
