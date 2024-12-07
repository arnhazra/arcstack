import Stripe from "stripe"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { envConfig } from "src/config"
import { User } from "../user/schemas/user.schema"
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { subscriptionPricing, SubscriptionTier } from "./subscription.config"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateSubscriptionCommand } from "./commands/impl/create-subscription.command"
import { FindSubscriptionByUserIdQuery } from "./queries/impl/find-subscription-by-user-id.query"
import { getRediretUriAPI } from "./utils/redirect-uri"

@Injectable()
export class SubscriptionService {
  private readonly stripe: Stripe

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    this.stripe = new Stripe(envConfig.stripeSecretKey)
  }

  getSubscriptionPricing() {
    try {
      return subscriptionPricing
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createCheckoutSession(
    tier: SubscriptionTier,
    userId: string
  ): Promise<Stripe.Checkout.Session> {
    try {
      const { price } = subscriptionPricing.find(
        (item) => item.subscriptionTier === tier
      )
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${envConfig.brandName} ${tier.toUpperCase()} subscription`,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${getRediretUriAPI(true)}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: getRediretUriAPI(false),
        metadata: {
          userId,
          price,
          tier,
        },
      })

      return session
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async handleSubscribe(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      const { userId, price, tier } = session.metadata
      const userResponse: User[] = await this.eventEmitter.emitAsync(
        EventsUnion.GetUserDetails,
        { _id: userId }
      )
      const user = userResponse[0]

      if (tier === SubscriptionTier.Trial) {
        if (!user.hasTrial) {
          throw new BadRequestException(statusMessages.connectionError)
        }

        await this.eventEmitter.emitAsync(
          EventsUnion.UpdateUserDetails,
          userId,
          "hasTrial",
          false
        )
      }

      const { xp, platformDelay } = subscriptionPricing.find(
        (item) => item.subscriptionTier === tier
      )

      await this.commandBus.execute(
        new CreateSubscriptionCommand(
          userId,
          tier as SubscriptionTier,
          xp,
          Number(price),
          platformDelay
        )
      )
      return { success: true }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @OnEvent(EventsUnion.GetSubscriptionDetails)
  async getMySubscription(userId: string) {
    try {
      return await this.queryBus.execute(
        new FindSubscriptionByUserIdQuery(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
