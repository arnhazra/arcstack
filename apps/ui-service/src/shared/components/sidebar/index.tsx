"use client"
import Link from "next/link"
import { MountainSnow, PanelLeft, Settings } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { Button } from "@/shared/components/ui/button"
import { UserNav } from "./user-nav"
import { Search } from "./search"
import { brandName } from "@/shared/constants/global-constants"
import { usePathname } from "next/navigation"
import { sidebarLinks } from "./data"

export default function Sidebar() {
  const pathName = usePathname()

  const generateLinkClassName = (uri: string) => {
    if (pathName.includes(uri)) {
      return "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-border text-lg font-semibold md:h-8 md:w-8 md:text-base text-primary"
    }

    return "flex h-9 w-9 items-center justify-center rounded-lg bg-accent transition-colors md:h-8 md:w-8"
  }

  const renderSheetLinks = sidebarLinks.map((link) => {
    return (
      <Link
        key={link.link}
        href={link.link}
        className="flex items-center gap-4 px-2.5"
      >
        {link.icon}
        {link.displayName}
      </Link>
    )
  })

  const renderSideBarLinks = sidebarLinks.map((link) => {
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
        <TooltipContent
          side="right"
          className="bg-background border-border text-white"
        >
          {link.displayName}
        </TooltipContent>
      </Tooltip>
    )
  })

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-main text-white border-border sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/catalog" className={generateLinkClassName("catalog")}>
            <MountainSnow className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Catalog</span>
          </Link>
          {renderSideBarLinks}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
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
            <TooltipContent
              side="right"
              className="bg-background border-border text-white"
            >
              Settings
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 lg:-mb-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-main px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="default"
                className="shrink-0 sm:hidden"
              >
                <PanelLeft className="scale-75" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-main text-white border-none"
            >
              <SheetTitle></SheetTitle>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/catalog"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-main text-lg font-semibold md:text-base"
                >
                  <MountainSnow className="scale-75" />
                  <span className="sr-only">{brandName}</span>
                </Link>
                <Link
                  href="/catalog"
                  className="flex items-center gap-4 px-2.5"
                >
                  <MountainSnow className="scale-75" />
                  Catalog
                </Link>
                {renderSheetLinks}
                <Link
                  href="/settings/user"
                  className="flex items-center gap-4 px-2.5"
                >
                  <Settings className="scale-75" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/catalog" className="hidden sm:flex text-white text-lg">
            {brandName}
          </Link>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search />
          </div>
          <UserNav />
        </header>
      </div>
    </>
  )
}
