import { buttonVariants } from "@/shared/components/ui/button"
import { uiConstants } from "@/shared/constants/global-constants"
import { cn } from "@/shared/lib/utils"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 hero-landing">
      <div className="container max-w-[80rem] text-left">
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 max-w-[40rem]">
          {uiConstants.homeHeader}
        </h1>
        <p className="max-w-[42rem] leading-normal text-white sm:text-xl sm:leading-8 mb-6">
          {uiConstants.homeIntro1}
        </p>
        <Link
          href="/explore"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "secondary",
              className: "rounded-full",
            })
          )}
        >
          {uiConstants.getStartedButton}
        </Link>
      </div>
    </section>
  )
}
