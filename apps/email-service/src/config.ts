import { config as envConfig } from "dotenv"
envConfig({ path: "./.env.development" })

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  GCLOUD_REDIRECT_URI: process.env.GCLOUD_REDIRECT_URI,
  GCLOUD_CLIENT_ID: process.env.GCLOUD_CLIENT_ID,
  GCLOUD_CLIENT_SECRET: process.env.GCLOUD_CLIENT_SECRET,
  GCLOUD_REFRESH_TOKEN: process.env.GCLOUD_REFRESH_TOKEN,
  MAILER_EMAIL: process.env.MAILER_EMAIL,
  RMQ_URI: process.env.RMQ_URI,
}
