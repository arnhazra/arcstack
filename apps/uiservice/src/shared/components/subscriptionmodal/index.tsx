import { ArrowRightCircle, Bell, Check } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import useQuery from "@/shared/hooks/use-query"
import { SubscriptionConfig } from "@/shared/types"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import ky from "ky"
import { toast } from "sonner"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { useRouter } from "next/navigation"

interface SubscriptionModalProps {
  open: boolean
  customMessage?: string
  onOpenChange: (open: boolean) => void
}

export function SubscriptionModal({
  open,
  customMessage,
  onOpenChange,
}: SubscriptionModalProps) {
  const router = useRouter()
  const subscriptionPricing = useQuery<SubscriptionConfig>({
    queryKey: ["pricing-settings"],
    queryUrl: endPoints.getSubscriptionPricing,
    method: HTTPMethods.GET,
  })

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-background border-border text-white -mb-4"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{brandName} Pro</DialogTitle>
          <DialogDescription className="text-zinc-300">
            {customMessage ??
              `What's included in the ${subscriptionPricing.data?.subscriptionName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
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
            className="bg-primary hover:bg-primary"
            onClick={activateSubscription}
          >
            Upgrade <ArrowRightCircle className="ms-2 scale-75" />
          </Button>
          <Button
            variant="link"
            className="text-primary"
            onClick={(): void => {
              router.push("/settings/subscription")
              onOpenChange(false)
            }}
          >
            I'll do this later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
