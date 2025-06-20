import { Subscription, User } from "@/shared/types"

export type AppState = {
  user: User
  subscription: Subscription | null
  isSubscriptionActive: boolean
  refreshId: string
  searchQuery: string
}

export type ActionsMap = {
  setUser: Partial<User>
  setSubscription: Subscription | null
  setRefreshId: string
  setSubscriptionActive: boolean
  setSearchQuery: string
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key
    payload: ActionsMap[Key]
  }
}[keyof ActionsMap]

export const AppReducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }

    case "setSubscription":
      return {
        ...state,
        subscription: action.payload,
      }

    case "setRefreshId":
      return {
        ...state,
        refreshId: action.payload,
      }

    case "setSubscriptionActive":
      return {
        ...state,
        isSubscriptionActive: action.payload,
      }

    case "setSearchQuery":
      return {
        ...state,
        searchQuery: action.payload,
      }

    case "setSearchQuery":
      return {
        ...state,
        searchQuery: action.payload,
      }

    default:
      return state
  }
}
