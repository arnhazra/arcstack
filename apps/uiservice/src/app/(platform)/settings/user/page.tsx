"use client"
import CopyToClipboard from "@/shared/components/copy"
import SectionPanel from "../../../../shared/components/sectionpanel"
import { Button } from "@/shared/components/ui/button"
import { toast } from "sonner"
import { endPoints } from "@/shared/constants/api-endpoints"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import ky from "ky"
import { User, IdCard, AtSign, CircleArrowRight, Bell } from "lucide-react"
import { useContext } from "react"

export default function Page() {
  const [{ user }] = useContext(GlobalContext)

  const signOut = async (signOutOption: string) => {
    try {
      if (signOutOption === "all") {
        await ky.post(endPoints.signOut, { timeout: FETCH_TIMEOUT })
      }
      localStorage.clear()
      window.location.replace("/")
    } catch (error) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.toastError,
      })
    }
  }

  return (
    <section className="grid gap-2">
      <SectionPanel
        icon={<User className="scale-75" />}
        title="Your Name"
        content={user.name}
      />
      <SectionPanel
        icon={<IdCard className="scale-75" />}
        title={`${brandName} ID`}
        content={user._id}
        masked
        actionComponents={[<CopyToClipboard value={user._id} />]}
      />
      <SectionPanel
        icon={<AtSign className="scale-75" />}
        title="Your Email"
        content={user.email}
        actionComponents={[<CopyToClipboard value={user.email} />]}
      />
      <SectionPanel
        icon={<CircleArrowRight className="scale-75" />}
        title="Sign Out"
        content="Sign out from all logged in devices"
        actionComponents={[
          <Button
            size="icon"
            className="rounded-full"
            variant="destructive"
            onClick={(): Promise<void> => signOut("all")}
          >
            <CircleArrowRight className="scale-75" />
          </Button>,
        ]}
      />
    </section>
  )
}
