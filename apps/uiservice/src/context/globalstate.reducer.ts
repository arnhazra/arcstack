import { Subscription, User } from "@/shared/types"

export type GlobalState = {
  user: User
  subscription: Subscription | null
  refreshId: string
}

export type ActionsMap = {
  setUser: Partial<User>
  setSubscription: Subscription | null
  setRefreshId: string
}

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key
    payload: ActionsMap[Key]
  }
}[keyof ActionsMap]

export const GlobalReducer = (
  state: GlobalState,
  action: Actions
): GlobalState => {
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

    default:
      return state
  }
}
