export enum SubscriptionTier {
  Free = "free",
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
    subscriptionTier: SubscriptionTier.Free,
    price: 0,
    platformDelay: 1000,
    features: [
      "Good for limited usage",
      "Delayed API response",
      "200 API calls per day",
      "Includes Only Free Models",
      "Use pretrained models",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.Pro,
    price: 15,
    platformDelay: 0,
    features: [
      "Good for extensive usage",
      "Priority API response",
      "Unlimited API calls",
      "Includes Pro Models",
      "Build & train own model",
    ],
  },
]
