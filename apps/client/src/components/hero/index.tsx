import { ReactNode } from "react"
import "./style.sass"

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="hero pt-3 ps-4 pe-4 pb-2">
      {children}
    </div>
  )
}