import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateThreadCommand } from "./commands/impl/create-thread.command"
import { Thread } from "./schemas/thread.schema"
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { Types } from "mongoose"
import { FetchThreadByIdQuery } from "./queries/impl/fetch-thread-by-id.query"
import { DerivedModelResponseDto } from "../derivedmodel/dto/response/derived-model.response.dto"
import GeminiStrategy from "./strategies/gemini.strategy"
import GroqStrategy from "./strategies/groq.strategy"
import OpenAIStrategy from "./strategies/openai.strategy"
import { GetUsageByUserIdQuery } from "./queries/impl/get-usage-by-user-id.query"
import { statusMessages } from "@/shared/constants/status-messages"

@Injectable()
export class ChatService {
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

      const thread = await this.queryBus.execute<
        FetchThreadByIdQuery,
        Thread[]
      >(new FetchThreadByIdQuery(threadId))
      if (!!thread && thread.length) {
        return thread
      } else {
        throw new BadRequestException("Thread not found")
      }
    } catch (error) {
      throw error
    }
  }

  @OnEvent(EventsUnion.GetThreadCount)
  async getTodaysUsageByUserId(userId: string) {
    try {
      return await this.queryBus.execute<GetUsageByUserIdQuery, number>(
        new GetUsageByUserIdQuery(userId)
      )
    } catch (error) {
      throw error
    }
  }

  async generateRecommendation(
    aiGenerationDto: AIGenerationDto,
    userId: string,
    hasProSubscription: boolean
  ) {
    try {
      const { modelId, prompt, temperature, topP } = aiGenerationDto
      const threadId =
        aiGenerationDto.threadId ?? new Types.ObjectId().toString()
      const thread = await this.getThreadById(
        threadId,
        !aiGenerationDto.threadId
      )
      const gModel = await this.getModelById(modelId)

      if (gModel.isPro && !hasProSubscription) {
        throw new ForbiddenException(statusMessages.subscriptionNotFound)
      }

      if (gModel.baseModel.genericName.includes("gemini")) {
        const { response } = await GeminiStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          thread,
          prompt,
          gModel.systemPrompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )
        return { response, threadId }
      } else if (gModel.baseModel.genericName.includes("gpt")) {
        const { response } = await OpenAIStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          thread,
          prompt,
          gModel.systemPrompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )
        return { response, threadId }
      } else {
        const { response } = await GroqStrategy(
          gModel.baseModel.genericName,
          temperature ?? gModel.baseModel.defaultTemperature,
          topP ?? gModel.baseModel.defaultTopP,
          thread,
          prompt,
          gModel.systemPrompt
        )
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )
        return { response, threadId }
      }
    } catch (error) {
      throw error
    }
  }
}
