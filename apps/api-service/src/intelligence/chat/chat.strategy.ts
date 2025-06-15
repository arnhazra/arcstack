import { Injectable } from "@nestjs/common"
import { Thread } from "./schemas/thread.schema"
import { config } from "@/config"
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenAI } from "@langchain/openai"

interface ChatStrategyType {
  genericName: string
  temperature: number
  topP: number
  thread: Thread[]
  prompt: string
  systemPrompt: string
}

@Injectable()
export class ChatStrategy {
  async openaiStrategy({
    genericName,
    temperature,
    topP,
    thread,
    prompt,
    systemPrompt,
  }: ChatStrategyType) {
    const llm = new ChatOpenAI({
      model: genericName,
      temperature: temperature,
      apiKey: config.OPENAI_API_KEY,
      configuration: {
        baseURL: config.AZURE_OPENAI_URI,
        apiKey: config.OPENAI_API_KEY,
      },
    })

    const chatHistory = thread.flatMap((chat) => [
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ])

    if (systemPrompt) {
      const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: prompt },
      ])
      return { response: response.content.toString() }
    }

    const response = await llm.invoke([
      ...chatHistory,
      { role: "user", content: prompt },
    ])
    return { response: response.content.toString() }
  }

  async googleStrategy({
    genericName,
    temperature,
    topP,
    thread,
    prompt,
    systemPrompt,
  }: ChatStrategyType) {
    const llm = new ChatGoogleGenerativeAI({
      model: genericName,
      temperature: temperature,
      topP: topP,
      apiKey: config.GEMINI_API_KEY,
    })

    const chatHistory = thread.flatMap((chat) => [
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ])

    if (systemPrompt) {
      const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: prompt },
      ])
      return { response: response.content.toString() }
    }

    const response = await llm.invoke([
      ...chatHistory,
      { role: "user", content: prompt },
    ])
    return { response: response.content.toString() }
  }

  async groqStrategy({
    genericName,
    temperature,
    thread,
    prompt,
    systemPrompt,
  }: ChatStrategyType) {
    const llm = new ChatGroq({
      model: genericName,
      temperature: temperature,
      apiKey: config.GROQ_API_KEY,
    })

    const chatHistory = thread.flatMap((chat) => [
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ])

    if (systemPrompt) {
      const response = await llm.invoke([
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: prompt },
      ])
      return { response: response.content.toString() }
    }

    const response = await llm.invoke([
      ...chatHistory,
      { role: "user", content: prompt },
    ])
    return { response: response.content.toString() }
  }
}
