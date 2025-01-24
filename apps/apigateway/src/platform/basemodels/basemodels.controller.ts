import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from "@nestjs/common"
import { BaseModelsService } from "./basemodels.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { CreateBaseModelDto } from "./dto/create-base-model.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"

@Controller("basemodels")
export class BaseModelsController {
  constructor(private readonly baseModelsService: BaseModelsService) {}

  @UseGuards(TokenGuard)
  @Post("")
  async createModel(@Body() createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.baseModelsService.createModel(createBaseModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("")
  async findModels() {
    try {
      return await this.baseModelsService.findAllModels()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("/:baseModelId")
  @OnEvent(EventsUnion.GetBaseModelDetails)
  async findOneModel(@Param("baseModelId") baseModelId: string) {
    try {
      return await this.baseModelsService.findOneModel(baseModelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
