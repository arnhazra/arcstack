import { Groq } from "@llamaindex/groq"
import { ChatMessage } from "llamaindex"

export default async function GroqStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  gMessages: ChatMessage[],
  prompt: string
) {
  const client = new Groq({
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
