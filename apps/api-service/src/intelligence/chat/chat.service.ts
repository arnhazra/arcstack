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
import { BaseModelResponseDto } from "../basemodel/dto/base-model.response.dto"
import { GetUsageByUserIdQuery } from "./queries/impl/get-usage-by-user-id.query"
import { statusMessages } from "@/shared/constants/status-messages"
import { ChatStrategy, ChatStrategyType } from "./chat.strategy"

@Injectable()
export class ChatService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2,
    private readonly chatStrategy: ChatStrategy
  ) {}

  async getModelById(modelId: string) {
    try {
      const modelResponse: BaseModelResponseDto[] =
        await this.eventEmitter.emitAsync(
          EventsUnion.GetBaseModelDetails,
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
    isSubscriptionActive: boolean
  ) {
    try {
      const { modelId, prompt, temperature, topP } = aiGenerationDto
      const threadId =
        aiGenerationDto.threadId ?? new Types.ObjectId().toString()
      const thread = await this.getThreadById(
        threadId,
        !aiGenerationDto.threadId
      )
      const bModel = await this.getModelById(modelId)

      if (bModel.isPro && !isSubscriptionActive) {
        throw new ForbiddenException(statusMessages.subscriptionNotFound)
      }

      const args: ChatStrategyType = {
        genericName: bModel.genericName,
        temperature: temperature ?? bModel.defaultTemperature,
        topP: topP ?? bModel.defaultTopP,
        thread,
        prompt,
        threadId,
        canSearchWeb: bModel.canSearchWeb,
      }

      if (bModel.deployment === "Google Cloud") {
        const { response } = await this.chatStrategy.googleStrategy(args)
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )
        return { response, threadId }
      } else if (bModel.deployment === "Microsoft Azure") {
        const { response } = await this.chatStrategy.azureStrategy(args)
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )
        return { response, threadId }
      } else if (bModel.deployment === "Groq Cloud") {
        const { response } = await this.chatStrategy.groqStrategy(args)
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(userId, threadId, prompt, response)
        )

        return { response, threadId }
      } else {
        throw new BadRequestException()
      }
    } catch (error) {
      throw error
    }
  }
}
