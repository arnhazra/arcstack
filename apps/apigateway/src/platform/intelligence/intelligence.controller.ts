import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Request,
} from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialGuard } from "src/shared/auth/credential.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"

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
      throw new BadRequestException()
    }
  }
}
