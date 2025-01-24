import { Injectable } from "@nestjs/common"
import { CreateBaseModelDto } from "./dto/create-base-model.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateBaseModelCommand } from "./commands/impl/create-base-model.command"
import { BaseModel } from "./schemas/basemodel.schema"
import { FindAllBaseModelsQuery } from "./queries/impl/find-all-models.query"
import { FindOneBaseModelQuery } from "./queries/impl/find-one-model.query"

@Injectable()
export class BaseModelsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createModel(createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.commandBus.execute<CreateBaseModelCommand, BaseModel>(
        new CreateBaseModelCommand(createBaseModelDto)
      )
    } catch (error) {
      throw error
    }
  }

  async findAllModels() {
    try {
      return await this.queryBus.execute<FindAllBaseModelsQuery, BaseModel[]>(
        new FindAllBaseModelsQuery()
      )
    } catch (error) {
      throw error
    }
  }

  async findOneModel(modelId: string) {
    try {
      return await this.queryBus.execute<FindOneBaseModelQuery, BaseModel>(
        new FindOneBaseModelQuery(modelId)
      )
    } catch (error) {
      throw error
    }
  }
}
