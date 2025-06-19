"use client"
import { ReactNode, createContext, useReducer } from "react"
import { AppState, Actions, ActionsMap, AppReducer } from "./appstate.reducer"
import { generateRandomKey } from "@/shared/lib/random-key-gen"

export type Dispatcher = <Type extends keyof ActionsMap>(
  type: Type,
  payload: ActionsMap[Type]
) => void

type AppContextInterface = readonly [AppState, Dispatcher]

const initialState: AppState = {
  user: {
    _id: "",
    activityLog: true,
    createdAt: "",
    email: "",
    name: "",
    reduceCarbonEmissions: true,
    role: "",
  },
  subscription: null,
  isSubscriptionActive: false,
  refreshId: generateRandomKey(),
  searchQuery: "",
}

export const AppContext = createContext<AppContextInterface>([
  initialState,
  (): void => undefined,
])

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(AppReducer, initialState)
  const dispatch: Dispatcher = (type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }
  const values: AppContextInterface = [state, dispatch]
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
