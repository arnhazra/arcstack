import { Injectable } from "@nestjs/common"
import { Thread } from "./schemas/thread.schema"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { config } from "@/config"
import { z } from "zod"
import { ChatMessage, tool } from "llamaindex"
import { Groq } from "@llamaindex/groq"
import { OpenAIAgent, openai } from "@llamaindex/openai"
import {
  Content,
  GenerationConfig,
  GoogleGenerativeAI,
} from "@google/generative-ai"

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

  getCurrentDate = tool({
    name: "getCurrentDate",
    description: "Use this function when user asks for current date",
    parameters: z.object({}),
    execute: () => {
      console.log("getdate")
      return new Date().toISOString()
    },
  })

  searchWeb = tool({
    name: "searchWeb",
    description: "Use this function search the web",
    parameters: z.object({
      searchString: z.string().describe("The search keyword"),
    }),
    execute: async ({ searchString }: { searchString: string }) => {
      console.log("searchString", searchString)
      const uri = `${config.GOOGLE_CSE_API_URI}&q=${searchString}`
      const response = await lastValueFrom(this.httpService.get<any>(uri))
      const cleanedData = response?.data?.items?.map(
        (item: any) => item?.title + item?.snippet
      )
      return JSON.stringify(cleanedData)
    },
  })

  getWeather = tool({
    name: "getWeather",
    description: "Use this tool to get current weather for a specific city",
    parameters: z.object({
      city: z.string().describe("City name to get weather for"),
    }),
    execute: async ({ city }: { city: string }) => {
      console.log("city", city)

      try {
        const response = await lastValueFrom(
          this.httpService.get<any>(config.WEATHER_API_URI)
        )

        return `Current weather in ${response.data.name}: ${JSON.stringify(response.data)}.`
      } catch (err) {
        return `Sorry, I couldn't fetch weather for "${city}". Please try a different city.`
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
    const chatHistory: ChatMessage[] = thread.flatMap((chat) => [
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ])

    const agent = new OpenAIAgent({
      tools: [this.getCurrentDate, this.searchWeb, this.getWeather],
      llm: openai({
        model: genericName as any,
        azure: {
          endpoint: config.AZURE_OPENAI_URI,
          apiKey: config.OPENAI_API_KEY,
        },
        temperature: temperature,
        topP: topP,
      }),
      verbose: true,
    })

    const result = await agent.chat({
      chatHistory: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...chatHistory,
      ],
      message: prompt,
    })
    const response = result.message.content.toString()
    return { response }
  }

  async googleStrategy({
    genericName,
    temperature,
    topP,
    thread,
    prompt,
    systemPrompt,
  }: ChatStrategyType) {
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

    const response = (await result.sendMessage(prompt)).response.text()
    return { response }
  }

  async groqStrategy({
    genericName,
    temperature,
    topP,
    thread,
    prompt,
    systemPrompt,
  }: ChatStrategyType) {
    const chatHistory: ChatMessage[] = thread.flatMap((chat) => [
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ])

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
}
