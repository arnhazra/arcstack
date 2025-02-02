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
  generateOTP: `${apiHost}/user/generateotp`,
  validateOTP: `${apiHost}/user/validateotp`,
  userDetails: `${apiHost}/user/userdetails`,
  signOut: `${apiHost}/user/signout`,
  updateAttribute: `${apiHost}/user/attribute`,
  getSubscriptionPricing: `${apiHost}/subscription/pricing`,
  createCheckoutSession: `${apiHost}/subscription/checkout`,
  getModels: `${apiHost}/getmodels`,
  getapireference: `${apiHost}/apireference`,
  apiKey: `${apiHost}/apikey`,
  activityTrends: `${apiHost}/activity/trends`,
  modelsListings: `${apiHost}/models/derivedmodel/listings`,
}
