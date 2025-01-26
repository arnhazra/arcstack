import { BadRequestException, Injectable } from "@nestjs/common"
import {
  Content,
  GenerationConfig,
  GoogleGenerativeAI,
} from "@google/generative-ai"
import { envConfig } from "src/config"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateThreadCommand } from "./commands/impl/create-thread.command"
import { Thread } from "./schemas/thread.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { DerivedModel } from "../models/schemas/derivedmodel.schema"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { Types } from "mongoose"
import { FetchThreadByIdQuery } from "./queries/impl/fetch-thread-by-id.query"
import { BaseModel } from "../models/schemas/basemodel.schema"

@Injectable()
export class IntelligenceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async generateRecommendation(aiGenerationDto: AIGenerationDto) {
    try {
      const { modelId, prompt, temperature, topK, topP } = aiGenerationDto
      const chatHistory: Content[] = []
      const threadId =
        aiGenerationDto.threadId ?? new Types.ObjectId().toString()

      if (aiGenerationDto.threadId) {
        const thread = await this.queryBus.execute<
          FetchThreadByIdQuery,
          Thread[]
        >(new FetchThreadByIdQuery(threadId))

        if (!!thread && thread.length) {
          const history: Content[] = thread.flatMap((chat) => [
            {
              role: "user",
              parts: [{ text: chat.prompt }],
            },
            {
              role: "model",
              parts: [{ text: chat.response }],
            },
          ])

          chatHistory.push(...history)
        } else {
          throw new BadRequestException("Thread not found")
        }
      }

      const modelResponse: { model: DerivedModel; baseModel: BaseModel }[] =
        await this.eventEmitter.emitAsync(EventsUnion.GetModelDetails, modelId)

      if (modelResponse && modelResponse.length && modelResponse[0] !== null) {
        const modelRes = modelResponse[0]
        const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
        const generationConfig: GenerationConfig = {
          temperature: temperature ?? modelRes.baseModel.defaultTemperature,
          topP: topP ?? modelRes.baseModel.defaultTopP,
          topK: topK ?? modelRes.baseModel.defaultTopK,
        }

        const model = genAI.getGenerativeModel({
          model: modelRes.baseModel.genericName,
          generationConfig,
          systemInstruction: modelRes.model.systemPrompt,
        })

        const result = model.startChat({
          history: chatHistory,
        })

        const response = (await result.sendMessage(prompt)).response.text()
        await this.commandBus.execute<CreateThreadCommand, Thread>(
          new CreateThreadCommand(threadId, prompt, response)
        )
        return { response, threadId }
      } else {
        throw new BadRequestException("Model not found")
      }
    } catch (error) {
      throw error
    }
  }
}
