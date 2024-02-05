"use client"
import Error from "@/components/error"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useContext } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()

  const selectPlan = (planName: string) => {
    router.push(`/subscription/pay?planName=${planName}`)
  }

  const displayPricing = useCallback(() => {
    const productsToDisplay = pricingDetails?.data?.map((pricing: any) => {
      return (
        <Col key={pricing.planName}>
          <Hero>
            <p className="text-secondary">{uiConstants.brandName}</p>
            <h4 className="branding">{pricing.planName}</h4>
            <h2>{pricing.price} MATIC</h2>
            <h5 className="mb-3 mt-3">{Number(pricing.grantedCredits).toLocaleString()} Credits</h5>
            <p className="text-secondary"><CheckIcon className="icon-left" />Valid for a month</p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Try all features</>}>
                <CheckIcon className="icon-left" />Exclusive access
              </Suspense>
            </p>
            <p className="text-secondary"><CheckIcon className="icon-left" />{Number(pricing.grantedCredits).toLocaleString()} Credits</p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Regular API Response</>}>
                <CheckIcon className="icon-left" />Priority API Response
              </Suspense>
            </p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Completely free</>}>
                <CheckIcon className="icon-left" />Discontinue anytime
              </Suspense>
            </p>
            <Button disabled={userState.hasActiveSubscription} variant="primary" className="btn-block" onClick={(): void => selectPlan(pricing.planName)}>
              Select & Continue<ArrowRightIcon className="icon-right" />
            </Button>
          </Hero>
        </Col >
      )
    })

    return (
      <Suspense condition={!!pricingDetails?.data?.length} fallback={<h4 className="text-white">No plans to display</h4>}>
        <h4 className="text-white">Find a plan that works</h4>
        <div>
          <Row xs={1} sm={1} md={2} lg={3} xl={4} className="justify-content-center">
            {productsToDisplay}
          </Row>
        </div>
      </Suspense>
    )
  }, [pricingDetails?.data])

  return (
    <Fragment>
      <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
        <Suspense condition={!pricingDetails.error} fallback={<Error />}>
          <Container>
            {displayPricing()}
          </Container>
        </Suspense>
      </Suspense>
    </Fragment>
  )
}