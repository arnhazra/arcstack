"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { CheckCircle2, Share2 } from "lucide-react"
import Show from "../show"

export default function Share() {
  const [isCopied, setCopied] = useState(false)

  const copyValue = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={copyValue}
      title="Share Model URL"
      className="bg-border hover:bg-border"
    >
      <Show
        condition={!isCopied}
        fallback={<CheckCircle2 className="scale-65 text-primary" />}
      >
        <Share2 className="scale-75" />
      </Show>
    </Button>
  )
}
