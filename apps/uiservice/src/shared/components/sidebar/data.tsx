import { Bolt, GitCompare, Heart, History, Newspaper } from "lucide-react"
import { ReactNode } from "react"

interface LinkData {
  displayName: string
  link: string
  icon: ReactNode
}

export const sidebarLinks: LinkData[] = [
  {
    displayName: "Favourites",
    link: "/favourites",
    icon: <Heart className="scale-75" />,
  },
  {
    displayName: "History",
    link: "/history",
    icon: <History className="scale-75" />,
  },
  {
    displayName: "Build Model",
    link: "/build",
    icon: <GitCompare className="scale-75" />,
  },
  {
    displayName: "My Builds",
    link: "/mybuilds",
    icon: <Bolt className="scale-75" />,
  },
  {
    displayName: "NewsRoom",
    link: "/newsroom",
    icon: <Newspaper className="scale-75" />,
  },
]

export const getBreadcrumbTitle = (uri: string) => {
  if (uri.includes("apireference")) {
    return "API Reference"
  }

  if (uri.includes("settings")) {
    return "Settings"
  }

  if (uri.includes("favourites")) {
    return "Favourites"
  }

  if (uri.includes("history")) {
    return "History"
  }

  if (uri.includes("mybuilds")) {
    return "My Builds"
  }

  if (uri.includes("build")) {
    return "Build"
  }

  if (uri.includes("newsroom")) {
    return "NewsRoom"
  }

  return ""
}
