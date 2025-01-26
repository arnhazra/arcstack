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
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { CreateBaseModelDto } from "./dto/request/create-base-model.request.dto"

@Controller("models")
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @UseGuards(TokenGuard)
  @Post("basemodel/create")
  async createBaseModel(@Body() createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.modelsService.createBaseModel(createBaseModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("basemodel/listings")
  async findBaseModels() {
    try {
      return await this.modelsService.findAllBaseModels()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("basemodel/:baseModelId")
  async findOneBaseModel(@Param("baseModelId") baseModelId: string) {
    try {
      return await this.modelsService.findOneBaseModel(baseModelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("derivedmodel/create")
  async createDerivedModel(@Body() createModelDto: CreateDerivedModelDto) {
    try {
      return await this.modelsService.createDerivedModel(createModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("derivedmodel/listings")
  async findModels(@Body() findAllModelsDto: FindDerivedModelsDto) {
    try {
      return await this.modelsService.findAllDerivedModels(findAllModelsDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("derivedmodel/:modelId")
  @OnEvent(EventsUnion.GetDerivedModelDetails)
  async findOneModel(@Param("modelId") modelId: string) {
    try {
      return await this.modelsService.findOneDerivedModel(modelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
