import { SubscriptionTier } from "../../subscription.config"

export class CreateSubscriptionCommand {
  constructor(
    public readonly userId: string,
    public readonly subscriptionTier: SubscriptionTier,
    public readonly price: number
  ) {}
}
