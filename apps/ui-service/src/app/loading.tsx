"use client"
import { Progress } from "@/shared/components/ui/progress"
import { brandName } from "@/shared/constants/global-constants"
import { MountainSnow } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-main space-y-4">
      <MountainSnow className="text-white" width={48} height={48} />
      <p className="text-white">Loading {brandName}</p>
      <Progress
        indeterminate
        className="xl:w-[20%] lg:w-[25%] md:w-[30%] w-[50%] rounded-xs"
      />
    </div>
  )
}
