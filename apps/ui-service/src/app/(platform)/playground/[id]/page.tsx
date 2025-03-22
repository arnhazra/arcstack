"use client"
import { Globe, MessageCircle, Send } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { endPoints } from "@/shared/constants/api-endpoints"
import { use, useContext, useEffect, useRef, useState } from "react"
import ky from "ky"
import Show from "@/shared/components/show"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { APIKey, DerivedModel, Thread } from "@/shared/types"
import { useRouter } from "nextjs-toploader/app"
import Error from "@/app/error"
import { GlobalContext } from "@/context/globalstate.provider"
import { useSearchParams } from "next/navigation"
import { SubscriptionModal } from "@/shared/components/subscriptionmodal"
import MarkdownRenderer from "@/shared/components/markdown"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const { id: modelId = "" } = use(params)
  const searchParams = useSearchParams()
  const threadId = searchParams.get("threadId")
  const router = useRouter()
  const [{ isSubscriptionActive }] = useContext(GlobalContext)
  const [prompt, setPrompt] = useState("")
  const model = useQuery<DerivedModel>({
    queryKey: ["model", modelId ?? ""],
    queryUrl: `${endPoints.getOneDerivedModel}/${modelId}`,
    method: HTTPMethods.GET,
  })

  const apiKeys = useQuery<APIKey[]>({
    queryKey: ["get-apikeys-pg"],
    queryUrl: endPoints.apiKey,
    method: HTTPMethods.GET,
  })

  const thread = useQuery<Thread[]>({
    queryKey: ["thread", threadId ?? ""],
    queryUrl: `${endPoints.intelligenceChat}/${threadId}`,
    method: HTTPMethods.GET,
    suspense: false,
    enabled: !!threadId,
  })

  const [messages, setMessages] = useState<string[]>(
    thread.data?.flatMap(({ prompt, response }) => [
      prompt ?? "",
      response ?? "",
    ]) ?? []
  )
  const [requestBody, setRequestBody] = useState({
    modelId: modelId,
    prompt: "",
    temperature: model?.data?.baseModel?.defaultTemperature ?? 0.7,
    topP: model?.data?.baseModel?.defaultTemperature ?? 1,
    useWebSearch: false,
  })
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()
    setRequestBody({
      ...requestBody,
      useWebSearch: false,
    })
    setMessages([...messages, prompt, "Thinking..."])
    setPrompt("")

    try {
      setLoading(true)
      const res: any = await ky
        .post(`${endPoints.intelligenceChat}`, {
          json: { ...requestBody, threadId: threadId ?? undefined },
          headers: {
            "x-api-key": !!apiKeys?.data?.length ? apiKeys.data[0].apiKey : "",
          },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        res?.response,
      ])
      if (!threadId) {
        router.push(`?threadId=${(res as any).threadId}`)
      }
    } catch (error: any) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        "An error occurred",
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const messages = thread.data?.flatMap(({ prompt, response }) => [
      prompt ?? "",
      response ?? "",
    ])
    setMessages(messages ?? [])
  }, [thread.data, thread.isLoading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Show condition={!model.error} fallback={<Error />}>
      <SubscriptionModal
        open={
          (model.data?.baseModel?.isPro as boolean) && !isSubscriptionActive
        }
        customMessage="You need Pro subscription to access this model"
        onOpenChange={(): void => undefined}
      />
      <Card className="relative flex flex-col h-[89vh] bg-background border-none text-white">
        <CardHeader className="h-[8vh] -mb-8">
          <div className="flex justify-end">
            <CardTitle className="text-xs p-2 px-6 bg-background z-50 border rounded-md border-lightborder">
              {model.data?.displayName}
            </CardTitle>
          </div>
        </CardHeader>
        <Show condition={messages.length > 0}>
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="ms-4 mb-8 pb-8">
              {messages.map((message, index) => (
                <MarkdownRenderer
                  user={index % 2 === 0 ? "You" : "Assistant"}
                  key={index}
                  markdown={message}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Show>
        <Show condition={!thread.isLoading && messages.length === 0}>
          <CardContent className="flex-1 flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <MessageCircle className="w-16 h-16 text-zinc-400" />
              <p className="text-zinc-400 text-lg">
                Type a message to start a conversation
              </p>
            </div>
          </CardContent>
        </Show>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-background rounded-md">
          <form onSubmit={hitAPI} className="flex items-center gap-2">
            <Input
              autoFocus
              autoComplete="off"
              id="message"
              value={prompt}
              required
              spellCheck="false"
              placeholder="Ask anything..."
              className="flex-1 min-h-12 resize-none border-none outline-hidden p-3 shadow-none bg-border text-white"
              onChange={(e): void => {
                setPrompt(e.target.value)
                setRequestBody({
                  ...requestBody,
                  prompt: e.target.value,
                })
              }}
            />
            <Show condition={!!model?.data?.hasWebSearchCapability}>
              <Button
                className={`gap-1.5 h-12 bg-border hover:bg-border ${requestBody.useWebSearch && "text-sky-400"}`}
                type="button"
                onClick={(): void =>
                  setRequestBody({
                    ...requestBody,
                    useWebSearch: !requestBody.useWebSearch,
                  })
                }
                title="Web Search (Beta)"
                disabled={isLoading}
              >
                <Globe className="scale-75" />
              </Button>
            </Show>
            <Button
              className="gap-1.5 h-12 bg-border hover:bg-border"
              type="submit"
              disabled={isLoading}
            >
              <Send className="scale-75" />
            </Button>
          </form>
        </div>
      </Card>
    </Show>
  )
}
