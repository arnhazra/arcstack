import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
} from "@nestjs/common"
import { ChatService } from "./chat.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { APIKeyGuard } from "@/shared/auth/apikey.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"
import { TokenGuard } from "@/shared/auth/token.guard"

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
        request.user.isSubscriptionActive
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get(":threadId")
  async getThreadById(
    @Request() request: ModRequest,
    @Param("threadId") threadId: string
  ) {
    try {
      return await this.service.getThreadById(threadId, false)
    } catch (error) {
      throw error
    }
  }
}
