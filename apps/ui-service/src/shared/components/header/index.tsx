import Link from "next/link"
import { MountainSnow, PanelLeft } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { generalUserLinks } from "./data"
import { brandName } from "@/shared/constants/global-constants"

export default function Header() {
  return (
    <header className="relative z-50 top-0 flex h-[72px] items-center bg-main text-white px-4 md:px-6">
      <div className="flex w-full items-center justify-between lg:container lg:max-w-[75rem]">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <MountainSnow className="h-6 w-6" />
          {brandName}
        </Link>
        <nav className="hidden md:flex items-center justify-end gap-2 flex-1">
          {generalUserLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-md font-medium text-white hover:text-primary mx-3"
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noopener noreferrer" : ""}
            >
              {item.displayName}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-main text-white border-none"
            >
              <SheetTitle></SheetTitle>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <MountainSnow className="h-6 w-6" />
                </Link>
                {generalUserLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="text-white hover:text-primary"
                    target={item.external ? "_blank" : ""}
                    rel={item.external ? "noopener noreferrer" : ""}
                  >
                    {item.displayName}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
