import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from "@nestjs/common"
import { DerivedModelService } from "./derivedmodel.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { sortOptions } from "./data/model-sort-options"

@Controller("derivedmodel")
export class DerivedModelController {
  constructor(private readonly service: DerivedModelService) {}

  @UseGuards(TokenGuard)
  @Get("filters-and-sort-options")
  async getFiltersAndSortOptions() {
    try {
      const filters = await this.service.getFiltersAndSortOptions()
      return { filters, sortOptions }
    } catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("create")
  async createDerivedModel(@Body() createModelDto: CreateDerivedModelDto) {
    try {
      return await this.service.createDerivedModel(createModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("listings")
  async findModels(@Body() findAllModelsDto: FindDerivedModelsDto) {
    try {
      return await this.service.findAllDerivedModels(findAllModelsDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get(":modelId")
  @OnEvent(EventsUnion.GetDerivedModelDetails)
  async findOneModel(@Param("modelId") modelId: string) {
    try {
      return await this.service.findOneDerivedModel(modelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
