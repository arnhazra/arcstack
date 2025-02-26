export type BaseModel = {
  _id: string
  genericName: string
  displayName: string
  series: string
  provider: string
  defaultTemperature: number
  defaultTopP: number
  architecture: string
  contextWindow: string
  parameters: string
}

export type DerivedModel = {
  _id: string
  displayName: string
  description: string
  category: string
  baseModel: BaseModel
  isFineTuned: boolean
  promptStyle: string
  isPro: boolean
  responseFormat: string
}

export type Favourites = {
  _id: string
  userId: string
  derivedModel: DerivedModel
  createdAt: string
}

export type History = {
  _id: string
  userId: string
  derivedModel: DerivedModel
  createdAt: string
}

export type User = {
  _id: string
  email: string
  name: string
  role: string
  reduceCarbonEmissions: boolean
  activityLog: boolean
  createdAt: string
}

export type SubscriptionConfig = {
  subscriptionName: string
  price: number
  features: string[]
}

export type Subscription = {
  _id: string
  userId: string
  price: number
  createdAt: string
  endsAt: string
}

export type APIKey = {
  _id: string
  userId: string
  apiKey: string
  createdAt: string
}

export type FilterAndSortOptions = {
  filters: string[]
  sortOptions: {
    value: string
    label: string
  }[]
}

export type ActivityTrends = {
  totalUsage: number
}

export type APIReference = {
  _id: string
  apiName: string
  apiDescription: string
  apiUri: string
  apiMethod: string
  sampleRequestBody: Record<string, any>
  sampleResponseBody: Record<string, any>
}
