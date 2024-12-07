"use client"
import { ReactNode, createContext, useReducer } from "react"
import {
  GlobalState,
  Actions,
  ActionsMap,
  GlobalReducer,
} from "./globalstate.reducer"
import { generateUUID } from "@/shared/lib/uuid-gen"

export type Dispatcher = <Type extends keyof ActionsMap>(
  type: Type,
  payload: ActionsMap[Type]
) => void

type GlobalContextInterface = readonly [GlobalState, Dispatcher]

const initialState: GlobalState = {
  user: {
    _id: "",
    activityLog: true,
    createdAt: "",
    email: "",
    name: "",
    reduceCarbonEmissions: true,
    role: "",
    selectedWorkspaceId: "",
    hasTrial: false,
  },
  subscription: null,
  selectedWorkspace: {
    _id: "",
    accessKey: "",
    createdAt: "",
    name: "",
    userId: "",
  },
  workspaces: [],
  refreshId: generateUUID(),
}

export const GlobalContext = createContext<GlobalContextInterface>([
  initialState,
  (): void => undefined,
])

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(GlobalReducer, initialState)
  const dispatch: Dispatcher = (type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions)
  }
  const values: GlobalContextInterface = [state, dispatch]
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  )
}
