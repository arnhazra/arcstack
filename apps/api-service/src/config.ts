import { config as envConfig } from "dotenv"
envConfig({ path: "./.env.development" })

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BRAND_NAME: process.env.BRAND_NAME,
  CORE_DATABASE_URI: process.env.CORE_DATABASE_URI,
  INTELLIGENCE_DATABASE_URI: process.env.INTELLIGENCE_DATABASE_URI,
  REDIS_URI: process.env.REDIS_URI,
  GCP_API_KEY: process.env.GCP_API_KEY,
  AZURE_API_KEY: process.env.AZURE_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  OTP_HASHING_KEY: process.env.OTP_HASHING_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  NEWS_API_URI: process.env.NEWS_API_URI,
  GOOGLE_CSE_API_URI: process.env.GOOGLE_CSE_API_URI,
  WEATHER_API_URI: process.env.WEATHER_API_URI,
  AZURE_DEPLOYMENT_URI: process.env.AZURE_DEPLOYMENT_URI,
  SUBSCRIPTION_PRICE: process.env.SUBSCRIPTION_PRICE,
  GCLOUD_REDIRECT_URI: process.env.GCLOUD_REDIRECT_URI,
  GCLOUD_CLIENT_ID: process.env.GCLOUD_CLIENT_ID,
  GCLOUD_CLIENT_SECRET: process.env.GCLOUD_CLIENT_SECRET,
  GCLOUD_REFRESH_TOKEN: process.env.GCLOUD_REFRESH_TOKEN,
  MAILER_EMAIL: process.env.MAILER_EMAIL,
}
