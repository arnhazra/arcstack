import {
  Bolt,
  Book,
  GitCompare,
  Heart,
  History,
  Newspaper,
  PenLine,
} from "lucide-react"
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
    icon: <PenLine className="scale-75" />,
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
  {
    displayName: "API Reference",
    link: "/apireference",
    icon: <Book className="scale-75" />,
  },
]
