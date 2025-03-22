import { Controller, BadRequestException, Get, UseGuards } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenGuard } from "src/shared/auth/token.guard"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) {}

  @UseGuards(TokenGuard)
  @Get()
  async getApiReference() {
    try {
      return await this.apireferenceService.getApiReference()
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
