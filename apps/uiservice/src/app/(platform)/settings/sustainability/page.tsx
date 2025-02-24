"use client"
import SectionPanel from "../../../../shared/components/sectionpanel"
import { Switch } from "@/shared/components/ui/switch"
import { toast } from "sonner"
import { endPoints } from "@/shared/constants/api-endpoints"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import ky from "ky"
import { Bell, Leaf } from "lucide-react"
import { useContext } from "react"

export default function Page() {
  const [{ user }, dispatch] = useContext(GlobalContext)

  const saveSustainabilitySettings = async (updatedSettings: boolean) => {
    try {
      dispatch("setUser", { reduceCarbonEmissions: updatedSettings })
      await ky.patch(
        `${endPoints.updateAttribute}/reduceCarbonEmissions/${updatedSettings}`,
        { timeout: FETCH_TIMEOUT }
      )
    } catch (error) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.toastError,
      })
    }
  }

  return (
    <SectionPanel
      icon={<Leaf className="scale-75" />}
      title="Reduce Carbon Emissions"
      content={`Turn this settings on to reduce carbon footprints inside ${brandName}`}
      actionComponents={[
        <Switch
          checked={user.reduceCarbonEmissions}
          onCheckedChange={(value): Promise<void> =>
            saveSustainabilitySettings(value)
          }
        />,
      ]}
    />
  )
}
