"use client"
import SectionPanel from "../../../../shared/components/sectionpanel"
import Show from "@/shared/components/show"
import { Button } from "@/shared/components/ui/button"
import { toast } from "sonner"
import { endPoints } from "@/shared/constants/api-endpoints"
import { uiConstants } from "@/shared/constants/global-constants"
import HTTPMethods from "@/shared/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/shared/hooks/use-query"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { SubscriptionConfig } from "@/shared/types"
import { format } from "date-fns"
import ky from "ky"
import {
  ArrowRightCircle,
  Bell,
  Bolt,
  CalendarClock,
  Check,
} from "lucide-react"
import { useContext, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

export default function Page() {
  const [{ subscription }] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const router = useRouter()

  const subscriptionPricing = useQuery<SubscriptionConfig>({
    queryKey: ["pricing-settings"],
    queryUrl: endPoints.getSubscriptionPricing,
    method: HTTPMethods.GET,
  })

  useEffect(() => {
    const subscriptionSuccess = searchParams.get("subscriptionSuccess")
    if (subscriptionSuccess !== null) {
      if (subscriptionSuccess === "true") {
        toast(uiConstants.notification, {
          icon: <Bell className="scale-75" />,
          description: "Subscription Activation Success",
        })
        router.push("/settings/subscription")
      }

      if (subscriptionSuccess === "false") {
        toast(uiConstants.notification, {
          icon: <Bell className="scale-75" />,
          description: "Subscription Activation Failure",
        })
        router.push("/settings/subscription")
      }
    }
  }, [searchParams])

  const isSubscriptionActive =
    subscription && new Date(subscription.endsAt) > new Date()

  const canActivateNewSubscription =
    !subscription ||
    (subscription &&
      new Date(subscription.endsAt).getTime() - new Date().getTime() <=
        24 * 60 * 60 * 1000)

  const activateSubscription = async () => {
    try {
      const response: any = await ky
        .post(endPoints.createCheckoutSession, {
          timeout: FETCH_TIMEOUT,
        })
        .json()
      window.location = response.redirectUrl
    } catch (error) {
      toast(uiConstants.notification, {
        icon: <Bell className="scale-75" />,
        description: uiConstants.toastError,
      })
    }
  }

  const renderProSubscription = (
    <>
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          What's included in the {subscriptionPricing.data?.subscriptionName}
        </h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {subscriptionPricing.data?.features.map((feature) => {
            return (
              <li className="flex items-center" key={feature}>
                <Check className="mr-2 h-4 w-4" /> {feature}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">
            ${subscriptionPricing.data?.price}
          </h4>
          <p className="text-sm font-medium text-muted-foreground">
            Billed Monthly
          </p>
        </div>
        <Button
          className="mb-6 ms-6 bg-primary hover:bg-primary"
          onClick={activateSubscription}
        >
          Upgrade <ArrowRightCircle className="ms-2 scale-75" />
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Show condition={!subscription || !isSubscriptionActive}>
        <SectionPanel
          icon={<CalendarClock className="scale-75" />}
          title="Your Subscription"
          content="You are on free subscription"
        />
      </Show>
      <Show condition={!!subscription && !!isSubscriptionActive}>
        <section className="grid gap-2">
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Your Subscription"
            content="You are on Pro subscription"
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
        </section>
      </Show>
      <Show condition={!!canActivateNewSubscription}>
        <div className="mt-4">
          <div className="grid w-full text-white items-start gap-10 rounded-lg border border-border p-10 md:grid-cols-[1fr_200px]">
            {renderProSubscription}
          </div>
        </div>
      </Show>
    </>
  )
}
