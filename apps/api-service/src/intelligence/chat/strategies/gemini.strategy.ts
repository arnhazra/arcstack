import { config } from "@/config"
import {
  Content,
  GenerationConfig,
  GoogleGenerativeAI,
} from "@google/generative-ai"
import { Thread } from "../schemas/thread.schema"

export default async function GeminiStrategy(
  genericName: string,
  temperature: number,
  topP: number,
  thread: Thread[],
  prompt: string,
  systemPrompt: string,
  webSearchResult?: string
) {
  const chatHistory: Content[] = []
  const content: Content[] = thread.flatMap((chat) => [
    {
      role: "user",
      parts: [{ text: chat.prompt }],
    },
    {
      role: "model",
      parts: [{ text: chat.response }],
    },
  ])
  chatHistory.push(...content)
  const client = new GoogleGenerativeAI(config.GEMINI_API_KEY)
  const generationConfig: GenerationConfig = {
    temperature: temperature,
    topP: topP,
  }

  const model = client.getGenerativeModel({
    model: genericName,
    generationConfig,
    systemInstruction: systemPrompt,
  })

  const result = model.startChat({
    history: [...chatHistory],
  })

  const response = (
    await result.sendMessage(
      !!webSearchResult
        ? `Summarize the data from web search: ${webSearchResult}.`
        : prompt
    )
  ).response.text()
  return { response }
}
