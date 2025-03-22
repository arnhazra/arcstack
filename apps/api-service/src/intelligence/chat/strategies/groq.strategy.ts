import { Groq } from "@llamaindex/groq"
import { ChatMessage } from "llamaindex"
import { Thread } from "../schemas/thread.schema"

export default async function GroqStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  thread: Thread[],
  prompt: string,
  systemPrompt: string
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
  const client = new Groq({
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
      { role: "user", content: prompt },
    ],
  })
  const response = result.message.content.toString()
  return { response }
}
