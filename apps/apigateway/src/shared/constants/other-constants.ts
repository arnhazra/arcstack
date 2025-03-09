import { config } from "src/config"

export const devUIURI = "http://localhost:3000"
export const prodUIURI = `https://${config.BRAND_NAME.toLowerCase()}.vercel.app`
export const devAPIURI = "http://localhost:8000/subscription"
export const prodAPIURI = `https://api-${config.BRAND_NAME.toLowerCase()}.vercel.app/subscription`
