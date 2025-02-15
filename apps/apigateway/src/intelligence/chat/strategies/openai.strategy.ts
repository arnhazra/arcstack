import { OpenAI } from "@llamaindex/openai"
import { ChatMessage } from "llamaindex"

const AZURE_OPENAI_ENDPOINT = "https://models.inference.ai.azure.com"

export default async function OpenAIStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  gMessages: ChatMessage[],
  prompt: string
) {
  const client = new OpenAI({
    azure: {
      endpoint: AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.OPENAI_API_KEY,
    },
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
