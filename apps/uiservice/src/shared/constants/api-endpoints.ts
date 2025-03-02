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
  getOneDerivedModel: `${apiHost}/derivedmodel`,
  createDerivedModel: `${apiHost}/derivedmodel/create`,
  getDerivedModels: `${apiHost}/derivedmodel/listings`,
  getMyBuilds: `${apiHost}/derivedmodel/mybuilds`,
  getDerivedModelFilterAndSortOptions: `${apiHost}/derivedmodel/filters-and-sort-options`,
  favourites: `${apiHost}/favourites`,
  history: `${apiHost}/history`,
  newsroom: `${apiHost}/newsroom`,
}
