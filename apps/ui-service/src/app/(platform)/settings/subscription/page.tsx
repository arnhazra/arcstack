"use client"
import SectionPanel from "../../../../shared/components/sectionpanel"
import Show from "@/shared/components/show"
import { toast } from "sonner"
import { uiConstants } from "@/shared/constants/global-constants"
import { GlobalContext } from "@/context/globalstate.provider"
import { format } from "date-fns"
import { Bell, Bolt, CalendarClock } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { SubscriptionModal } from "@/shared/components/subscriptionmodal"
import { Button } from "@/shared/components/ui/button"

export default function Page() {
  const [{ subscription, isSubscriptionActive }] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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

  const canActivateNewSubscription =
    !subscription ||
    (subscription &&
      new Date(subscription.endsAt).getTime() - new Date().getTime() <=
        24 * 60 * 60 * 1000)

  return (
    <>
      <SubscriptionModal open={isOpen} onOpenChange={setIsOpen} />
      <Show condition={!isSubscriptionActive}>
        <SectionPanel
          icon={<CalendarClock className="scale-75" />}
          title="Your Subscription"
          content="You are on free subscription"
          actionComponents={[
            <Button
              className="bg-primary hover:bg-primary"
              onClick={() => setIsOpen(true)}
            >
              Upgrade to Pro
            </Button>,
          ]}
        />
      </Show>
      <Show condition={!!isSubscriptionActive}>
        <section className="grid gap-2">
          <SectionPanel
            icon={<Bolt className="scale-75" />}
            title="Your Subscription"
            content="You are on Pro subscription"
            actionComponents={[
              <Show condition={!!canActivateNewSubscription}>
                <Button
                  className="bg-primary hover:bg-primary"
                  onClick={() => setIsOpen(true)}
                >
                  Renew Subscription
                </Button>
              </Show>,
            ]}
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
            content={
              subscription?.endsAt?.includes("9999")
                ? "Never Expires"
                : format(
                    subscription?.endsAt
                      ? new Date(subscription.endsAt)
                      : new Date(),
                    "MMM, do yyyy, h:mm a"
                  )
            }
          />
        </section>
      </Show>
    </>
  )
}
