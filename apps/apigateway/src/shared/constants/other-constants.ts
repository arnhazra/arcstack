import exp from "constants"
import { config } from "src/config"

export const devUIUri = "http://localhost:3000"
export const prodUIUri = `https://${config.BRAND_NAME.toLowerCase()}.vercel.app`
export const devAPIUri = "http://localhost:8000/subscription"
export const prodAPIUri = `https://api-${config.BRAND_NAME.toLowerCase()}.vercel.app/subscription`
export const newsAPIURI = `https://newsapi.org/v2/everything?q=openai&language=en&sortBy=publishedAt&apiKey=${config.NEWS_API_ORG_KEY}`
export const azureOpenAIURI = "https://models.inference.ai.azure.com"
export const tokenIssuer = prodUIUri
