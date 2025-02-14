import {
  Controller,
  Post,
  BadRequestException,
  Get,
  Delete,
  UseGuards,
  Request,
  Param,
} from "@nestjs/common"
import { APIKeyService } from "./apikey.service"
import { statusMessages } from "@/shared/constants/status-messages"
import { TokenGuard } from "@/shared/auth/token.guard"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("apikey")
export class APIKeyController {
  constructor(private readonly service: APIKeyService) {}

  @UseGuards(TokenGuard)
  @Post()
  async createAPIKey(@Request() request: ModRequest) {
    try {
      return await this.service.createAPIKey(request.user.userId)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  async findMyAPIKeys(@Request() request: ModRequest) {
    try {
      return await this.service.findMyAPIKeys(request.user.userId)
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Delete("/:apiKeyId")
  async deleteAPIKey(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.service.deleteAPIKey(
        request.user.userId,
        params.apiKeyId
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
