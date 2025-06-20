import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from "@nestjs/common"
import { BaseModelService } from "./basemodel.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { CreateBaseModelDto } from "./dto/create-base-model.request.dto"
import { FindBaseModelsDto } from "./dto/find-dervied-models.request.dto"
import { sortOptions } from "./data/model-sort-options"

@Controller("basemodel")
export class BaseModelController {
  constructor(private readonly service: BaseModelService) {}

  @UseGuards(TokenGuard)
  @Get("filters-and-sort-options")
  async getFiltersAndSortOptions() {
    try {
      const filters = await this.service.getFiltersAndSortOptions()
      return { filters, sortOptions }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post()
  async createBaseModel(@Body() createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.service.createBaseModel(createBaseModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("listings")
  async findModels(@Body() findAllModelsDto: FindBaseModelsDto) {
    try {
      return await this.service.findModels(findAllModelsDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get(":modelId")
  async findOneBaseModel(@Param("modelId") modelId: string) {
    try {
      return await this.service.findOneBaseModel(modelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
