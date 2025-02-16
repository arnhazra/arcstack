export enum SubscriptionTier {
  Free = "free tier",
  One = "one",
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
      "Good for exploration",
      "Delayed API response",
      "200 API calls per day",
      "Includes Only Free Models",
      "Use pretrained models",
    ],
  },
  {
    subscriptionTier: SubscriptionTier.One,
    price: 25,
    platformDelay: 0,
    features: [
      "Good for startups",
      "Fastest API response",
      "15000 API calls per day",
      "Includes Pro Models",
      "Build & train own model",
    ],
  },
]
