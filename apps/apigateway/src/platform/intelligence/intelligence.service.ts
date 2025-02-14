import { BadRequestException, Injectable } from "@nestjs/common"
// import { ChatMessage, Gemini, Groq, OpenAI } from "llamaindex"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateThreadCommand } from "./commands/impl/create-thread.command"
import { Thread } from "./schemas/thread.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { Types } from "mongoose"
import { FetchThreadByIdQuery } from "./queries/impl/fetch-thread-by-id.query"
import { DerivedModelResponseDto } from "../derivedmodel/dto/response/derived-model.response.dto"

@Injectable()
export class IntelligenceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async generateRecommendation(aiGenerationDto: AIGenerationDto) {
    // try {
    //   const { modelId, prompt, temperature, topP } = aiGenerationDto
    //   const chatHistory: ChatMessage[] = []
    //   const threadId =
    //     aiGenerationDto.threadId ?? new Types.ObjectId().toString()
    //   if (aiGenerationDto.threadId) {
    //     const thread = await this.queryBus.execute<
    //       FetchThreadByIdQuery,
    //       Thread[]
    //     >(new FetchThreadByIdQuery(threadId))
    //     if (!!thread && thread.length) {
    //       const history: ChatMessage[] = thread.flatMap((chat) => [
    //         {
    //           role: "user",
    //           content: chat.prompt,
    //         },
    //         {
    //           role: "assistant",
    //           content: chat.response,
    //         },
    //       ])
    //       chatHistory.push(...history)
    //     } else {
    //       throw new BadRequestException("Thread not found")
    //     }
    //   }
    //   const modelResponse: DerivedModelResponseDto[] =
    //     await this.eventEmitter.emitAsync(
    //       EventsUnion.GetDerivedModelDetails,
    //       modelId
    //     )
    //   if (modelResponse && modelResponse.length && modelResponse[0] !== null) {
    //     const modelRes = modelResponse.shift()
    //     if (modelRes.baseModel.genericName.includes("gemini")) {
    //       const gemini = new Gemini({
    //         model: modelRes.baseModel.genericName as any,
    //         temperature: temperature ?? modelRes.baseModel.defaultTemperature,
    //         topP: topP ?? modelRes.baseModel.defaultTopP,
    //       })
    //       const result = await gemini.chat({
    //         messages: [...chatHistory, { role: "user", content: prompt }],
    //       })
    //       const response = result.message.content.toString()
    //       await this.commandBus.execute<CreateThreadCommand, Thread>(
    //         new CreateThreadCommand(threadId, prompt, response)
    //       )
    //       return { response, threadId }
    //     } else if (modelRes.baseModel.genericName.includes("gpt")) {
    //       const openai = new OpenAI({
    //         azure: {
    //           endpoint: "https://models.inference.ai.azure.com",
    //           apiKey: process.env.OPENAI_API_KEY,
    //         },
    //         model: modelRes.baseModel.genericName as any,
    //         temperature: temperature ?? modelRes.baseModel.defaultTemperature,
    //         topP: topP ?? modelRes.baseModel.defaultTopP,
    //       })
    //       const result = await openai.chat({
    //         messages: [...chatHistory, { role: "user", content: prompt }],
    //       })
    //       const response = result.message.content.toString()
    //       await this.commandBus.execute<CreateThreadCommand, Thread>(
    //         new CreateThreadCommand(threadId, prompt, response)
    //       )
    //       return { response, threadId }
    //     } else {
    //       const groq = new Groq({
    //         model: modelRes.baseModel.genericName,
    //         temperature: temperature ?? modelRes.baseModel.defaultTemperature,
    //         topP: topP ?? modelRes.baseModel.defaultTopP,
    //       })
    //       const result = await groq.chat({
    //         messages: [...chatHistory, { role: "user", content: prompt }],
    //       })
    //       const response = result.message.content.toString()
    //       await this.commandBus.execute<CreateThreadCommand, Thread>(
    //         new CreateThreadCommand(threadId, prompt, response)
    //       )
    //       return { response, threadId }
    //     }
    //   } else {
    //     throw new BadRequestException("Model not found")
    //   }
    // } catch (error) {
    //   throw error
    // }
  }
}
