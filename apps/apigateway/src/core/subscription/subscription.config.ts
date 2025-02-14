export enum SubscriptionTier {
  Mini = "mini",
  Pro = "pro",
}

export interface SubscriptionConfig {
  subscriptionTier: SubscriptionTier
  price: number
  platformDelay: number
  features: string[]
}

export const subscriptionPricing: SubscriptionConfig[] = [
  {
    subscriptionTier: SubscriptionTier.Mini,
    price: 0,
    platformDelay: 1000,
    features: [
      "Good for exploration",
      "Delayed API response",
      "200 API calls per day",
      "Includes Only Free Models",
      "Use pretrained models",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Pro,
    price: 19,
    platformDelay: 0,
    features: [
      "Good for developers",
      "Priority API response",
      "Unlimited API calls",
      "Includes Pro Models",
      "Build & train own model",
    ],
  },
]
