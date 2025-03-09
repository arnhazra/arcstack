import { config } from "src/config"
import {
  devAPIUri,
  devUIUri,
  prodAPIUri,
  prodUIUri,
} from "@/shared/constants/other-constants"

export function getRediretUriUI(success: boolean) {
  if (success) {
    return config.NODE_ENV === "development"
      ? `${devUIUri}/settings/subscription?subscriptionSuccess=true`
      : `${prodUIUri}/settings/subscription?subscriptionSuccess=true`
  } else {
    return config.NODE_ENV === "development"
      ? `${devUIUri}/settings/subscription?subscriptionSuccess=false`
      : `${prodUIUri}/settings/subscription?subscriptionSuccess=false`
  }
}

export function getRediretUriAPI(success: boolean) {
  if (success) {
    return config.NODE_ENV === "development"
      ? `${devAPIUri}/subscribe`
      : `${prodAPIUri}/subscribe`
  } else {
    return config.NODE_ENV === "development"
      ? `${devAPIUri}/cancel`
      : `${prodAPIUri}/cancel`
  }
}
