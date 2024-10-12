"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GlobalContext } from "@/context/globalstate.provider"
import { CircleUser, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function UserNav() {
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()

  const signOut = async () => {
    localStorage.clear()
    window.location.replace("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User className="scale-75" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userState.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userState.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(): void => router.push("/settings/user")}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={(): void => router.push("/settings/organization")}>Organization</DropdownMenuItem>
          <DropdownMenuItem onClick={(): void => router.push("/")}>Home Page</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}