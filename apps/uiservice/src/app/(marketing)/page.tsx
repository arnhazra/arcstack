"use client"
import Header from "@/shared/components/header"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import { BaseModel, Subscription } from "@/shared/types"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { CircleArrowRight, Dot, Github } from "lucide-react"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"
import { buttonVariants } from "@/shared/components/ui/button"
import Show from "@/shared/components/show"
import Loading from "../loading"
import useQuery from "@/shared/hooks/use-query"
import { BaseModelCard } from "@/shared/components/modelcard"
import { UseQueryResult } from "@tanstack/react-query"
import { ShareCard, TeachCard, TestCard } from "@/shared/components/safetycard"

export default function Page() {
  const models: UseQueryResult<BaseModel[], Error> = useQuery({
    queryKey: ["display-models"],
    queryUrl: endPoints.getDisplayModels,
    method: HTTPMethods.GET,
  })

  const pricing: UseQueryResult<Subscription[], Error> = useQuery({
    queryKey: ["pricing"],
    queryUrl: endPoints.getSubscriptionPricing,
    method: HTTPMethods.GET,
  })

  const renderBaseModels = models?.data?.map((model) => (
    <BaseModelCard key={model._id} model={model} />
  ))

  const renderHeroSection = (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24 hero-landing">
      <div className="container max-w-[75rem] text-left">
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 max-w-[40rem]">
          {uiConstants.homeHeader}
        </h1>
        <p className="max-w-[35rem] leading-normal text-zinc-300 sm:text-lg sm:leading-8 mb-6">
          {uiConstants.homeIntro1}
        </p>
        <Link
          href="/catalog"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "default",
              className: "rounded-full bg-primary hover:bg-primary",
            })
          )}
        >
          {uiConstants.getStartedButton}{" "}
          <CircleArrowRight className="ms-2 scale-75" />
        </Link>
      </div>
    </section>
  )

  const renderOpenSourceSection = (
    <section id="opensource" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Open Source
        </h2>
        <p className="max-w-[85%] leading-normal text-zinc-300 sm:text-lg sm:leading-7">
          {uiConstants.openSourceHeader} <br /> The code is available on{" "}
          <Link
            href={uiConstants.githubRepoUri}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </Link>
          .{" "}
        </p>
        <Link
          href={uiConstants.githubRepoUri}
          target="_blank"
          rel="noreferrer"
          className="flex"
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-border bg-background">
            <Github />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-border border-y-transparent"></div>
            <div className="flex h-10 items-center rounded-md border border-border bg-background px-4 font-medium">
              {""} Stars on GitHub
            </div>
          </div>
        </Link>
      </div>
    </section>
  )

  const renderPricingTiers = pricing?.data?.map((tier) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-background border-border"
        key={tier.subscriptionTier}
      >
        <div className="flex flex-col justify-between rounded-md p-6">
          <div className="space-y-2">
            <h2 className="font-bold text-md capitalize">{brandName}</h2>
            <h1 className="font-bolder text-md capitalize text-3xl text-primary">
              {tier.subscriptionTier}
            </h1>
            <div className="flex">
              <h2 className="font-bold text-3xl capitalize">${tier.price}</h2>
              <span className="flex flex-col justify-end text-sm mb-1">
                /month
              </span>
            </div>
          </div>
          <p className="text-sm mt-4 mb-4">{tier.features[0]}</p>
          <ul className="grid gap-3 text-sm">
            {tier.features.slice(1).map((feature) => (
              <li className="flex text-xs items-center" key={feature}>
                <Dot className="scale-150 me-2" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            className={`${cn(buttonVariants({ variant: "default", className: "bg-primary hover:bg-primary" }))} mt-4`}
            href="/catalog"
          >
            {uiConstants.getStartedButton}
          </Link>
        </div>
      </div>
    )
  })

  const renderFooterSection = (
    <footer>
      <div className="bg-main text-white">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              © {new Date().getFullYear()} {brandName}{" "}
              {uiConstants.copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )

  return (
    <Show
      condition={!models.isLoading && !pricing.isLoading}
      fallback={<Loading />}
    >
      <div className="min-h-screen w-full text-white">
        <Header />
        {renderHeroSection}
        <section
          id="models"
          className="mt-8 container space-y-6 py-8 md:py-12 lg:py-24 lg:rounded-lg text-zinc-300"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Generic Models
            </h2>
            <p className="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
              {uiConstants.modelsHeader}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[35rem] md:grid-cols-2 lg:max-w-[50rem] lg:grid-cols-3 xl:max-w-[68rem] xl:grid-cols-4">
            {renderBaseModels}
          </div>
        </section>
        {renderOpenSourceSection}
        <section
          id="safety"
          className="mt-8 container space-y-6 py-8 md:py-12 lg:py-24 lg:rounded-lg"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Safety at every step
            </h2>
            <p className="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
              {uiConstants.safetyHeader}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[35rem] md:grid-cols-1 lg:max-w-[50rem] lg:grid-cols-2 xl:max-w-[68rem] xl:grid-cols-3">
            <TeachCard />
            <TestCard />
            <ShareCard />
          </div>
        </section>
        <section id="plans" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[70rem] flex-col items-center justify-center gap-4 text-center mb-8">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
              {uiConstants.pricingTierHeader}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:max-w-[40rem]">
            {renderPricingTiers}
          </div>
        </section>
      </div>
      {renderFooterSection}
    </Show>
  )
}
