"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useFetch from "@/shared/hooks/use-fetch"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { DerivedModel } from "@/shared/types"
import { UseQueryResult } from "@tanstack/react-query"
import ky from "ky"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useRef, use } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: modelId = "" } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const threadId = searchParams.get("threadId")
  const model: UseQueryResult<DerivedModel, Error> = useFetch({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getDerivedModel}/${modelId}`,
    method: HTTPMethods.GET,
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    }

    setMessages([...messages, newMessage])

    const res: any = await ky
      .post(`${endPoints.intelligenceChat}`, {
        json: {
          modelId: modelId,
          prompt: inputText,
          temperature: model.data?.baseModel.defaultTemperature,
          topP: model.data?.baseModel.defaultTopP,
          threadId: threadId ?? undefined,
        },
        timeout: FETCH_TIMEOUT,
      })
      .json()
    if (!threadId) {
      router.push(`?threadId=${(res as any).threadId}`)
    }

    setInputText("")
    const botResponse: Message = {
      id: Date.now(),
      text: res?.response,
      sender: "bot",
    }
    setMessages((prevMessages) => [...prevMessages, botResponse])
  }

  return (
    <div className="relative flex flex-col h-screen mx-auto bg-zinc-900 text-gray-100 rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-lime-400 text-white"
                  : "bg-zinc-700 text-gray-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-4 border-none rounded-lg flex space-x-2 shadow-lg"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 bg-zinc-800 text-gray-100 border border-zinc-700 rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  )
}
