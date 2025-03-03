import { OpenAI } from "@llamaindex/openai"
import { ChatMessage } from "llamaindex"
import { Thread } from "../schemas/thread.schema"
import { azureOpenAIURI } from "@/shared/constants/other-constants"

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
      endpoint: azureOpenAIURI,
      apiKey: process.env.OPENAI_API_KEY,
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
          ? `Read the following web search data and summarize according the prompt 
          WebSearchResult: ${webSearchResult}. 
          Prompt: ${prompt}`
          : prompt,
      },
    ],
  })
  const response = result.message.content.toString()
  return { response }
}
