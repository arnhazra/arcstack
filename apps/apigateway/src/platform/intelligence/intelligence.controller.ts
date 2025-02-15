import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { APIKeyGuard } from "@/shared/auth/apikey.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"
import { TokenGuard } from "@/shared/auth/token.guard"

@Controller("intelligence")
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post("chat")
  async generateRecommendation(
    @Request() request: ModRequest,
    @Body() aiGenerationDto: AIGenerationDto
  ) {
    try {
      return await this.intelligenceService.generateRecommendation(
        aiGenerationDto
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get("chat/:threadId")
  async getThreadById(
    @Request() request: ModRequest,
    @Param() threadId: string
  ) {
    try {
      return await this.intelligenceService.getThreadById(threadId, false)
    } catch (error) {
      throw error
    }
  }
}
