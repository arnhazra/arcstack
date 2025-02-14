import { Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateBaseModelDto } from "./dto/create-base-model.request.dto"
import { BaseModel } from "./schemas/basemodel.schema"
import { CreateBaseModelCommand } from "./commands/impl/create-base-model.command"
import { FindAllBaseModelsQuery } from "./queries/impl/find-all-base-models.query"
import { FindOneBaseModelQuery } from "./queries/impl/find-one-base-model.query"

@Injectable()
export class BaseModelService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createBaseModel(createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.commandBus.execute<CreateBaseModelCommand, BaseModel>(
        new CreateBaseModelCommand(createBaseModelDto)
      )
    } catch (error) {
      throw error
    }
  }

  async findAllBaseModels() {
    try {
      return await this.queryBus.execute<FindAllBaseModelsQuery, BaseModel[]>(
        new FindAllBaseModelsQuery()
      )
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
