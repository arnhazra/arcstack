import { Injectable } from "@nestjs/common"
import { Thread } from "./schemas/thread.schema"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { config } from "@/config"
import { statusMessages } from "@/shared/constants/status-messages"
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenAI } from "@langchain/openai"
import { DynamicTool } from "@langchain/core/tools"

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
  constructor(private readonly httpService: HttpService) {}

  getCurrentDateTool = new DynamicTool({
    name: "getCurrentDate",
    description: "Use this function when user asks for current date",
    func: async () => {
      return new Date().toISOString()
    },
  })

  searchWebTool = new DynamicTool({
    name: "searchWeb",
    description: "look things up online",
    func: async (searchString: string) => {
      try {
        const uri = `${config.GOOGLE_CSE_API_URI}&q=${searchString}`
        const response = await lastValueFrom(this.httpService.get<any>(uri))
        const cleanedData = response?.data?.items?.map(
          (item: any) => item?.title + item?.snippet
        )
        return JSON.stringify(cleanedData)
      } catch (error) {
        return statusMessages.connectionError
      }
    },
  })

  getWeatherTool = new DynamicTool({
    name: "getWeather",
    description: "Use this tool to get current weather for a specific city",
    func: async (city: string) => {
      try {
        const response = await lastValueFrom(
          this.httpService.get<any>(config.WEATHER_API_URI)
        )

        return `Current weather in ${response.data.name}: ${JSON.stringify(response.data)}.`
      } catch (err) {
        return statusMessages.connectionError
      }
    },
  })

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

    const agent = llm.bindTools([
      this.searchWebTool,
      this.getCurrentDateTool,
      this.getWeatherTool,
    ])

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
      const response = await agent.invoke([
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
