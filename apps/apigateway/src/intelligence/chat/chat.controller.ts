import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common"
import { ChatService } from "./chat.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { APIKeyGuard } from "@/shared/auth/apikey.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"

@Controller("chat")
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @UseGuards(APIKeyGuard)
  @Post()
  async generateRecommendation(
    @Request() request: ModRequest,
    @Body() aiGenerationDto: AIGenerationDto
  ) {
    try {
      return await this.service.generateRecommendation(
        aiGenerationDto,
        request.user.userId,
        request.user.hasProSubscription
      )
    } catch (error) {
      throw error
    }
  }
}
