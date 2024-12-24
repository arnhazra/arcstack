import { Injectable } from "@nestjs/common"
import { FindAllModelsDto } from "./dto/find-all-models.dto"
import { CreateModelDto } from "./dto/create-model.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateModelCommand } from "./commands/impl/create-model.command"
import { Model } from "./schemas/model.schema"
import { FindAllModelsQuery } from "./queries/impl/find-all-models.query"
import { FindOneModelQuery } from "./queries/impl/find-one-model.query"

@Injectable()
export class ModelsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createModel(createModelDto: CreateModelDto) {
    try {
      return await this.commandBus.execute<CreateModelCommand, Model>(
        new CreateModelCommand(createModelDto)
      )
    } catch (error) {
      throw error
    }
  }

  async findAllModels(findAllModelsDto: FindAllModelsDto) {
    try {
      return await this.queryBus.execute<FindAllModelsQuery, Model[]>(
        new FindAllModelsQuery(findAllModelsDto)
      )
    } catch (error) {
      throw error
    }
  }

  async findOneModel(modelId: string) {
    try {
      return await this.queryBus.execute<FindOneModelQuery, Model>(
        new FindOneModelQuery(modelId)
      )
    } catch (error) {
      throw error
    }
  }
}
