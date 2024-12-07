"use client"
import Show from "@/shared/components/show"
import { GlobalContext } from "@/context/globalstate.provider"
import { ReactNode, useContext } from "react"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import useFetch from "@/shared/hooks/use-fetch"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import ActivityLog from "@/shared/components/activity"
import { brandName } from "@/shared/constants/global-constants"
import Loading from "@/app/loading"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ subscription }] = useContext(GlobalContext)
  const router = useRouter()
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useFetch({
    queryKey: ["products", pathName],
    queryUrl: endPoints.getProductConfig,
    method: HTTPMethods.GET,
  })
  const selectedProduct = products?.data?.find(
    (product: any) => product.productName === productName
  )

  const isSubscriptionActive =
    subscription &&
    subscription.xp > 0 &&
    new Date(subscription.endsAt) > new Date()

  const productLayout = (
    <>
      <div className="bg-white flex justify-between items-center mb-4 p-2 border rounded-md ps-4 pe-4">
        <div className="flex gap-4 items-center">
          <div
            className="scale-75"
            dangerouslySetInnerHTML={{ __html: selectedProduct?.productIcon }}
          />
          <div>
            <p className="text-sm font-semibold">
              {brandName} {selectedProduct?.displayName}
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              {selectedProduct?.description}
            </p>
          </div>
        </div>
        <ActivityLog keyword={productName} />
      </div>
      {children}
    </>
  )

  return (
    <Show condition={!products.isLoading} fallback={<Loading />}>
      <Show condition={!isSubscriptionActive} fallback={productLayout}>
        <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Hold On</CardTitle>
              <CardDescription>
                Seems like you do not have an active subscription to use/view
                this product
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                size="lg"
                className="w-full"
                onClick={(): void => router.push("/settings/subscription")}
              >
                Go to Subscriptions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Show>
    </Show>
  )
}
