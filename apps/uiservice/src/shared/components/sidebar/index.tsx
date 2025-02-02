"use client"
import Link from "next/link"
import { Book, DraftingCompass, PanelLeft, Settings } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { Button } from "@/shared/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { UserNav } from "./user-nav"
import { Search } from "./search"
import { brandName } from "@/shared/constants/global-constants"
import { usePathname } from "next/navigation"
import { getBreadcrumbTitle, sidebarLinks } from "./data"
import Show from "@/shared/components/show"

export default function Sidebar() {
  const pathName = usePathname()

  const generateLinkClassName = (uri: string) => {
    if (pathName.includes(uri)) {
      return "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-100 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    }

    return "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  }

  const renderSheetProducts = sidebarLinks.map((link) => {
    return (
      <Link
        key={link.link}
        href={link.link}
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        {link.icon}
        {link.displayName}
      </Link>
    )
  })

  const renderSideBarProducts = sidebarLinks.map((link) => {
    return (
      <Tooltip key={link.link}>
        <TooltipTrigger asChild>
          <Link
            key={link.link}
            href={link.link}
            className={generateLinkClassName(link.link)}
          >
            {link.icon}
            <span className="sr-only">{link.displayName}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{link.displayName}</TooltipContent>
      </Tooltip>
    )
  })

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/explore" className={generateLinkClassName("explore")}>
            <DraftingCompass className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Explore</span>
          </Link>
          {renderSideBarProducts}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/apireference/webanalytics"
                className={generateLinkClassName("apireference")}
              >
                <Book className="scale-75" />
                <span className="sr-only">API Reference</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">API Reference</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings/user"
                className={generateLinkClassName("settings")}
              >
                <Settings className="scale-75" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 lg:-mb-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="scale-75" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/explore"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <DraftingCompass className="scale-75" />
                  <span className="sr-only">{brandName}</span>
                </Link>
                <Link
                  href="/explore"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <DraftingCompass className="scale-75" />
                  Explore
                </Link>
                {renderSheetProducts}
                <Link
                  href="/apireference/webanalytics"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Book className="scale-75" />
                  API Reference
                </Link>
                <Link
                  href="/settings/user"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="scale-75" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/explore">{brandName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/explore">Explore</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Show condition={!!getBreadcrumbTitle(pathName)}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={pathName}>{getBreadcrumbTitle(pathName)}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Show>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search />
          </div>
          <UserNav />
        </header>
      </div>
    </>
  )
}
