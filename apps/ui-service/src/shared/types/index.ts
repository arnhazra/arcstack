export type BaseModel = {
  _id: string
  genericName: string
  displayName: string
  description: string
  series: string
  provider: string
  parameters: string
  contextWindow: string
  isPro: boolean
  architecture: string
  defaultTemperature: number
  defaultTopP: number
  responseFormat: string
  canSearchWeb: boolean
  deployment: string
}

export type Collections = {
  _id: string
  userId: string
  baseModel: BaseModel | null | undefined
  createdAt: string
}

export type History = {
  _id: string
  userId: string
  baseModel: BaseModel | null | undefined
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
  price: string
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

export type Thread = {
  _id: string
  threadId: string
  userId: string
  prompt: string | null | undefined
  response: string | null | undefined
  createdAt: string
}

export type Article = {
  source?: {
    id?: string | null
    name?: string | null
  } | null
  author?: string | null
  title?: string | null
  description?: string | null
  url?: string | null
  urlToImage?: string | null
  publishedAt?: Date | null
  content?: string | null
}

export type FindNewsResponse = {
  status?: string | null
  totalResults?: number | null
  articles?: Article[] | null
}
