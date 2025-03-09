import { config } from "src/config"
import {
  devAPIURI,
  devUIURI,
  prodAPIURI,
  prodUIURI,
} from "@/shared/constants/other-constants"

export function getRediretURIUI(success: boolean) {
  if (success) {
    return config.NODE_ENV === "development"
      ? `${devUIURI}/settings/subscription?subscriptionSuccess=true`
      : `${prodUIURI}/settings/subscription?subscriptionSuccess=true`
  } else {
    return config.NODE_ENV === "development"
      ? `${devUIURI}/settings/subscription?subscriptionSuccess=false`
      : `${prodUIURI}/settings/subscription?subscriptionSuccess=false`
  }
}

export function getRediretURIAPI(success: boolean) {
  if (success) {
    return config.NODE_ENV === "development"
      ? `${devAPIURI}/subscribe`
      : `${prodAPIURI}/subscribe`
  } else {
    return config.NODE_ENV === "development"
      ? `${devAPIURI}/cancel`
      : `${prodAPIURI}/cancel`
  }
}
