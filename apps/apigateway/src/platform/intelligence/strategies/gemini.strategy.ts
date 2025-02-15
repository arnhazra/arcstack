import { Gemini } from "@llamaindex/google"
import { ChatMessage } from "llamaindex"

export default async function GeminiStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  gMessages: ChatMessage[],
  prompt: string
) {
  const client = new Gemini({
    model: genericName as any,
    temperature: temperature,
    topP: topP,
  })
  const result = await client.chat({
    messages: [...gMessages, { role: "user", content: prompt }],
  })
  const response = result.message.content.toString()
  return { response }
}
