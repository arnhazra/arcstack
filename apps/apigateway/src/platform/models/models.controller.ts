import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from "@nestjs/common"
import { ModelsService } from "./models.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { FindAllModelsDto } from "./dto/find-all-models.dto"
import { CreateModelDto } from "./dto/create-model.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"

@Controller("models")
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @UseGuards(TokenGuard)
  @Post("create")
  async createModel(@Body() createModelDto: CreateModelDto) {
    try {
      return await this.modelsService.createModel(createModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("listings")
  async findModels(@Body() findAllModelsDto: FindAllModelsDto) {
    try {
      return await this.modelsService.findAllModels(findAllModelsDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("viewmodel/:modelId")
  @OnEvent(EventsUnion.GetModelDetails)
  async findOneModel(@Param("modelId") modelId: string) {
    try {
      return await this.modelsService.findOneModel(modelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
