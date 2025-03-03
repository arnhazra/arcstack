import { brandName } from "@/shared/constants/global-constants"
import SectionPanel from "../../../../shared/components/sectionpanel"
import { InfoIcon } from "lucide-react"

export default function Page() {
  return (
    <SectionPanel
      icon={<InfoIcon className="scale-75" />}
      title={`${brandName} Ecosystem Version`}
      content="1.0.1"
    />
  )
}
