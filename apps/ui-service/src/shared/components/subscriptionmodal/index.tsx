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
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"

interface SubscriptionModalProps {
  customMessage?: string
  buttonText?: string
  defaultOpen?: boolean
  className?: string
}

export function SubscriptionModal({
  customMessage,
  buttonText,
  defaultOpen,
  className,
}: SubscriptionModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(defaultOpen ?? false)
  const subscriptionPricing = useQuery<SubscriptionConfig>({
    queryKey: ["pricing-settings"],
    queryUrl: endPoints.getSubscriptionPricing,
    method: HTTPMethods.GET,
    suspense: false,
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
    <Dialog open={open} onOpenChange={setOpen}>
      {!defaultOpen && (
        <DialogTrigger asChild>
          <Button className={`${className} bg-primary hover:bg-primary`}>
            {buttonText ?? "Upgrade to Pro"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="max-w-[22rem] bg-background border-border text-white -mb-4"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{brandName} Pro</DialogTitle>
          <DialogDescription className="text-zinc-300">
            {customMessage ??
              `What's included in the ${subscriptionPricing.data?.subscriptionName}`}
          </DialogDescription>
          <h4 className="text-4xl font-bold">
            ${subscriptionPricing.data?.price}
            <span className="text-base font-normal ml-1">/month</span>
          </h4>
        </DialogHeader>
        <div className="grid gap-6">
          <ul className="grid gap-3 text-sm text-muted-foreground">
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
              setOpen(false)
              router.push("/settings/subscription")
            }}
          >
            I'll do this later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
