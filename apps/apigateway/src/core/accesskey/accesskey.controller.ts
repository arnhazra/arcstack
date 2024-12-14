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
import { AccessKeyService } from "./accesskey.service"
import { statusMessages } from "@/shared/utils/constants/status-messages"
import { TokenGuard } from "@/shared/auth/token.guard"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("accesskey")
export class AccessKeyController {
  constructor(private readonly accesskeyService: AccessKeyService) {}

  @UseGuards(TokenGuard)
  @Post()
  async createAccessKey(@Request() request: ModRequest) {
    try {
      return await this.accesskeyService.createAccessKey(request.user.userId)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  async findMyAccessKeys(@Request() request: ModRequest) {
    try {
      return await this.accesskeyService.findMyAccessKeys(request.user.userId)
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Delete("/:accesskeyId")
  async deleteAccessKey(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.accesskeyService.deleteAccessKey(
        request.user.userId,
        params.accesskeyId
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
