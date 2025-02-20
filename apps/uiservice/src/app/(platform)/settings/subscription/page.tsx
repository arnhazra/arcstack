"use client"
import SectionPanel from "../../../../shared/components/sectionpanel"
import Show from "@/shared/components/show"
import { Button } from "@/shared/components/ui/button"
import { toast } from "@/shared/components/ui/use-toast"
import { endPoints } from "@/shared/constants/api-endpoints"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/shared/hooks/use-query"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { Subscription } from "@/shared/types"
import { format } from "date-fns"
import ky from "ky"
import { Bolt, CalendarClock, Coins, Dot } from "lucide-react"
import { useContext, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { UseQueryResult } from "@tanstack/react-query"

export default function Page() {
  const [{ user, subscription }] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const router = useRouter()

  const pricing: UseQueryResult<Subscription[], Error> = useQuery({
    queryKey: ["pricing-settings"],
    queryUrl: endPoints.getSubscriptionPricing,
    method: HTTPMethods.GET,
  })

  useEffect(() => {
    const subscriptionSuccess = searchParams.get("subscriptionSuccess")
    if (subscriptionSuccess !== null) {
      if (subscriptionSuccess === "true") {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">Subscription Activation Success</p>
          ),
        })
        router.push("/settings/subscription")
      }

      if (subscriptionSuccess === "false") {
        toast({
          title: uiConstants.notification,
          description: (
            <p className="text-zinc-600">Subscription Activation Failure</p>
          ),
        })
        router.push("/settings/subscription")
      }
    }
  }, [searchParams])

  const isSubscriptionActive =
    subscription &&
    subscription.xp > 0 &&
    new Date(subscription.endsAt) > new Date()

  const canActivateNewSubscription =
    !subscription ||
    (subscription &&
      (subscription.xp < 2 ||
        new Date(subscription.endsAt).getTime() - new Date().getTime() <=
          24 * 60 * 60 * 1000))

  const renderPricingTiers = pricing?.data?.map((tier) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg border bg-zinc-900 border-zinc-800 text-white"
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
          <Button
            className="mt-4 bg-primary hover:bg-primary"
            onClick={() => activateSubscription(tier.subscriptionTier)}
          >
            Activate
          </Button>
        </div>
      </div>
    )
  })

  const activateSubscription = async (tier: string) => {
    try {
      const response: any = await ky
        .post(endPoints.createCheckoutSession, {
          json: { tier },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      window.location = response.redirectUrl
    } catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>,
      })
    }
  }

  return (
    <Show condition={!pricing.isLoading} fallback={<Loading />}>
      <Show condition={!subscription}>
        <SectionPanel
          icon={<CalendarClock className="scale-75" />}
          title="Your Subscription"
          content="You do not have an active subscription"
        />
      </Show>
      <Show condition={!!subscription}>
        <section className="grid gap-2">
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Your Subscription Tier"
            content={subscription?.subscriptionTier.toUpperCase() ?? ""}
          />
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Subscription Status"
            content={isSubscriptionActive ? "Active" : "Inactive"}
          />
          <SectionPanel
            icon={<CalendarClock className="scale-75" />}
            title="Subscription Start Date"
            content={format(
              subscription?.createdAt
                ? new Date(subscription.createdAt)
                : new Date(),
              "MMM, do yyyy, h:mm a"
            )}
          />
          <SectionPanel
            icon={<CalendarClock className="scale-75" />}
            title="Subscription Valid Upto"
            content={format(
              subscription?.endsAt ? new Date(subscription.endsAt) : new Date(),
              "MMM, do yyyy, h:mm a"
            )}
          />
          <SectionPanel
            icon={<Coins className="scale-75" />}
            title="Remaining XP"
            content={subscription?.xp.toFixed(2).toString() ?? "0"}
          />
        </section>
      </Show>
      <Show condition={!!canActivateNewSubscription}>
        <div className="mt-4">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:max-w-[40rem]">
            {renderPricingTiers}
          </div>
        </div>
      </Show>
    </Show>
  )
}
