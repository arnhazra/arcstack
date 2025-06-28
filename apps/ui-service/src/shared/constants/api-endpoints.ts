import { brandName } from "./global-constants"

export const apiHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : `https://api-${brandName.toLowerCase()}.vercel.app`

export const uiHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${brandName.toLowerCase()}.vercel.app`

export const endPoints = {
  activityTrends: `${apiHost}/activity/trends`,
  apiKey: `${apiHost}/apikey`,
  getapireference: `${apiHost}/apireference`,
  getDisplayModels: `${apiHost}/getmodels`,
  getSubscriptionPricing: `${apiHost}/subscription/pricing`,
  createCheckoutSession: `${apiHost}/subscription/checkout`,
  generateOTP: `${apiHost}/user/generateotp`,
  validateOTP: `${apiHost}/user/validateotp`,
  userDetails: `${apiHost}/user/userdetails`,
  signOut: `${apiHost}/user/signout`,
  updateAttribute: `${apiHost}/user/attribute`,
  baseModel: `${apiHost}/basemodel`,
  intelligenceChat: `${apiHost}/chat`,
  getOneBaseModel: `${apiHost}/baseModel`,
  getBaseModels: `${apiHost}/baseModel/listings`,
  getBaseModelFilterAndSortOptions: `${apiHost}/baseModel/filters-and-sort-options`,
  collections: `${apiHost}/collections`,
  history: `${apiHost}/history`,
  newsroom: `${apiHost}/newsroom`,
}
