import { BadRequestException, Injectable } from "@nestjs/common"
import { ChatMessage } from "llamaindex"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateThreadCommand } from "./commands/impl/create-thread.command"
import { Thread } from "./schemas/thread.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { Types } from "mongoose"
import { FetchThreadByIdQuery } from "./queries/impl/fetch-thread-by-id.query"
import { DerivedModelResponseDto } from "../derivedmodel/dto/response/derived-model.response.dto"
import GeminiStrategy from "./strategies/gemini.strategy"
import GroqStrategy from "./strategies/groq.strategy"
import OpenAIStrategy from "./strategies/openai.strategy"

@Injectable()
export class IntelligenceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getModelById(modelId: string) {
    try {
      const modelResponse: DerivedModelResponseDto[] =
        await this.eventEmitter.emitAsync(
          EventsUnion.GetDerivedModelDetails,
          modelId
        )

      if (modelResponse && modelResponse.length && modelResponse[0] !== null) {
        return modelResponse.shift()
      } else {
        throw new BadRequestException("Model not found")
      }
    } catch (error) {
      throw error
    }
  }

  async getThreadById(threadId: string, isFirstMessage: boolean) {
    try {
      if (isFirstMessage) {
        return []
      }

      const chatHistory: ChatMessage[] = []
      const thread = await this.queryBus.execute<
        FetchThreadByIdQuery,
        Thread[]
      >(new FetchThreadByIdQuery(threadId))
      if (!!thread && thread.length) {
        const history: ChatMessage[] = thread.flatMap((chat) => [
          {
            role: "user",
            content: chat.prompt,
          },
          {
            role: "assistant",
            content: chat.response,
          },
        ])
        chatHistory.push(...history)
        return chatHistory
      } else {
        throw new BadRequestException("Thread not found")
      }
    } catch (error) {
      throw error
    }
  }

  async generateRecommendation(aiGenerationDto: AIGenerationDto) {
    try {
      const { modelId, prompt, temperature, topP } = aiGenerationDto
      const threadId =
        aiGenerationDto.threadId ?? new Types.ObjectId().toString()
      const gMessages = await this.getThreadById(
        threadId,
        !aiGenerationDto.threadId
      )
      const gModel = await this.getModelById(modelId)

      if (gModel.baseModel.genericName.includes("gemini")) {
        const { response } = await GeminiStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          gMessages,
          prompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(threadId, prompt, response)
        )
        return { response, threadId }
      } else if (gModel.baseModel.genericName.includes("gpt")) {
        const { response } = await OpenAIStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          gMessages,
          prompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(threadId, prompt, response)
        )
        return { response, threadId }
      } else {
        const { response } = await GroqStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          gMessages,
          prompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(threadId, prompt, response)
        )
        return { response, threadId }
      }
    } catch (error) {
      throw error
    }
  }
}
