import { Injectable } from "@nestjs/common"
import { Thread } from "./schemas/thread.schema"
import { config } from "@/config"
import { ChatOpenAI } from "@langchain/openai"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatGroq } from "@langchain/groq"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { getTodayTool } from "./tools/date.tool"
import { searchTool } from "./tools/search.tool"
import { weatherTool } from "./tools/weather.tool"

export interface ChatStrategyType {
  genericName: string
  temperature: number
  topP: number
  thread: Thread[]
  prompt: string
}

@Injectable()
export class ChatStrategy {
  private async runAgent(
    llm: ChatOpenAI | ChatGoogleGenerativeAI | ChatGroq,
    thread: Thread[],
    prompt: string
  ) {
    const agent = createReactAgent({
      llm,
      tools: [getTodayTool, searchTool, weatherTool],
    })

    const chatHistory = thread.flatMap((t) => [
      { role: "user", content: t.prompt } as const,
      { role: "assistant", content: t.response } as const,
    ])

    const { messages } = await agent.invoke({
      messages: [...chatHistory, { role: "user", content: prompt }],
    })

    return messages[messages.length - 1]?.content.toString()
  }

  private buildAzureLLM(opts: ChatStrategyType) {
    return new ChatOpenAI({
      model: opts.genericName,
      temperature: opts.temperature,
      topP: opts.topP,
      apiKey: config.AZURE_API_KEY,
      configuration: {
        baseURL: config.AZURE_DEPLOYMENT_URI,
        apiKey: config.AZURE_API_KEY,
      },
    })
  }

  private buildGoogleLLM(opts: ChatStrategyType) {
    return new ChatGoogleGenerativeAI({
      model: opts.genericName,
      temperature: opts.temperature,
      topP: opts.topP,
      apiKey: config.GCP_API_KEY,
    })
  }

  private buildGroqLLM(opts: ChatStrategyType) {
    return new ChatGroq({
      model: opts.genericName,
      temperature: opts.temperature,
      topP: opts.topP,
      apiKey: config.GROQ_API_KEY,
    })
  }

  async azureStrategy(args: ChatStrategyType) {
    const llm = this.buildAzureLLM(args)
    const response = await this.runAgent(llm, args.thread, args.prompt)
    return { response }
  }

  async googleStrategy(args: ChatStrategyType) {
    const llm = this.buildGoogleLLM(args)
    const response = await this.runAgent(llm, args.thread, args.prompt)
    return { response }
  }

  async groqStrategy(args: ChatStrategyType) {
    const llm = this.buildGroqLLM(args)
    const response = await this.runAgent(llm, args.thread, args.prompt)
    return { response }
  }
}
