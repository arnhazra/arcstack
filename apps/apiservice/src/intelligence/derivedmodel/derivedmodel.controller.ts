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
import { DerivedModelService } from "./derivedmodel.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { sortOptions } from "./data/model-sort-options"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("derivedmodel")
export class DerivedModelController {
  constructor(
    private readonly service: DerivedModelService,
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
  @Post("create")
  async createDerivedModel(
    @Request() request: ModRequest,
    @Body() createModelDto: CreateDerivedModelDto
  ) {
    try {
      return await this.service.createDerivedModel(
        request.user.userId,
        createModelDto
      )
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
  @Get("mybuilds")
  async findMyBuilds(@Request() request: ModRequest) {
    try {
      return await this.service.findMyBuilds(request.user.userId)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get(":modelId")
  async findOneModel(
    @Request() request: ModRequest,
    @Param("modelId") modelId: string
  ) {
    try {
      const { userId } = request.user
      this.eventEmitter.emitAsync(EventsUnion.CreateHistory, {
        userId,
        modelId,
      })
      const { systemPrompt, ...modelWithoutSystemPrompt } =
        await this.service.findOneDerivedModel(modelId)
      return modelWithoutSystemPrompt
    } catch (error) {
      throw error
    }
  }
}
