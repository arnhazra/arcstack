import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
  Request,
} from "@nestjs/common"
import { BaseModelService } from "./basemodel.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { CreateBaseModelDto } from "./dto/create-base-model.request.dto"
import { FindBaseModelsDto } from "./dto/find-dervied-models.request.dto"
import { sortOptions } from "./data/model-sort-options"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("basemodel")
export class BaseModelController {
  constructor(
    private readonly service: BaseModelService,
    private readonly eventEmitter: EventEmitter2
  ) {}

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
  async findOneBaseModel(
    @Request() request: ModRequest,
    @Param("modelId") modelId: string
  ) {
    const {
      user: { userId },
    } = request

    try {
      this.eventEmitter.emitAsync(EventsUnion.CreateHistory, {
        userId,
        modelId,
      })
      return await this.service.findOneBaseModel(modelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
