import { Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateBaseModelDto } from "./dto/create-base-model.request.dto"
import { BaseModel } from "./schemas/basemodel.schema"
import { CreateBaseModelCommand } from "./commands/impl/create-base-model.command"
import { FindOneBaseModelQuery } from "./queries/impl/find-one-base-model.query"
import { FindFilterCategoriesQuery } from "./queries/impl/find-filter-categories.query"
import { FindBaseModelsDto } from "./dto/find-dervied-models.request.dto"
import { FindAllBaseModelsQuery } from "./queries/impl/find-all-base-models.query"
import { BaseModelResponseDto } from "./dto/base-model.response.dto"

@Injectable()
export class BaseModelService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async getFiltersAndSortOptions() {
    try {
      return await this.queryBus.execute<FindFilterCategoriesQuery, string[]>(
        new FindFilterCategoriesQuery()
      )
    } catch (error) {
      throw error
    }
  }

  async createBaseModel(createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.commandBus.execute<CreateBaseModelCommand, BaseModel>(
        new CreateBaseModelCommand(createBaseModelDto)
      )
    } catch (error) {
      throw error
    }
  }

  async findModels(findBaseModelsDto: FindBaseModelsDto) {
    try {
      return await this.queryBus.execute<
        FindAllBaseModelsQuery,
        BaseModelResponseDto[]
      >(new FindAllBaseModelsQuery(findBaseModelsDto))
    } catch (error) {
      throw error
    }
  }

  async findOneBaseModel(modelId: string) {
    try {
      return await this.queryBus.execute<FindOneBaseModelQuery, BaseModel>(
        new FindOneBaseModelQuery(modelId)
      )
    } catch (error) {
      throw error
    }
  }
}
