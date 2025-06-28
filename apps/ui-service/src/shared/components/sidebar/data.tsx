import { Bolt, Book, Bookmark, History, Newspaper, PenLine } from "lucide-react"
import { ReactNode } from "react"

interface LinkData {
  displayName: string
  link: string
  icon: ReactNode
}

export const sidebarLinks: LinkData[] = [
  {
    displayName: "Collections",
    link: "/collections",
    icon: <Bookmark className="scale-75" />,
  },
  {
    displayName: "History",
    link: "/history",
    icon: <History className="scale-75" />,
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
