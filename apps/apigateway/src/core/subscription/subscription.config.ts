export interface SubscriptionConfig {
  subscriptionName: string
  price: number
  features: string[]
}

export const subscriptionPricing: SubscriptionConfig = {
  subscriptionName: "Pro Subscription",
  price: 15,
  features: [
    "Priority API response",
    "Unlimited API calls",
    "Great for extensive usage",
    "Includes Pro Models",
    "Build & train custom models",
    "Latest AI Newsroom Access",
  ],
}
