import { OpenAI } from "@llamaindex/openai"
import { ChatMessage } from "llamaindex"
import { Thread } from "../schemas/thread.schema"
import { config } from "@/config"

export default async function OpenAIStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  thread: Thread[],
  prompt: string,
  systemPrompt: string,
  webSearchResult?: string
) {
  const chatHistory: ChatMessage[] = []
  const content: ChatMessage[] = thread.flatMap((chat) => [
    {
      role: "user",
      content: chat.prompt,
    },
    {
      role: "assistant",
      content: chat.response,
    },
  ])
  chatHistory.push(...content)
  const client = new OpenAI({
    azure: {
      endpoint: config.AZURE_OPENAI_URI,
      apiKey: config.OPENAI_API_KEY,
    },
    model: genericName as any,
    temperature: temperature,
    topP: topP,
  })
  const result = await client.chat({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...chatHistory,
      {
        role: "user",
        content: !!webSearchResult
          ? `Summarize the data from web search: ${webSearchResult}.`
          : prompt,
      },
    ],
  })
  const response = result.message.content.toString()
  return { response }
}
