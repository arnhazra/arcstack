import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common"
import { HistoryService } from "./history.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { CreateHistoryDto } from "./dto/create-history.dto"

@Controller("history")
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @OnEvent(EventsUnion.CreateHistory)
  create(createHistoryDto: CreateHistoryDto) {
    try {
      return this.service.create(
        createHistoryDto.userId,
        createHistoryDto.modelId
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll(@Request() request: ModRequest) {
    try {
      return this.service.findAll(request.user.userId)
    } catch (error) {
      throw error
    }
  }
}
