import { Injectable } from "@nestjs/common"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateDerivedModelCommand } from "./commands/impl/create-derived-model.command"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { FindAllDerivedModelsQuery } from "./queries/impl/find-all-derived-models.query"
import { FindOneDerivedModelQuery } from "./queries/impl/find-one-derived-model.query"
import { DerivedModelResponseDto } from "./dto/response/derived-model.response.dto"

@Injectable()
export class DerivedModelService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createDerivedModel(createDerivedModelDto: CreateDerivedModelDto) {
    try {
      return await this.commandBus.execute<
        CreateDerivedModelCommand,
        DerivedModel
      >(new CreateDerivedModelCommand(createDerivedModelDto))
    } catch (error) {
      throw error
    }
  }

  async findAllDerivedModels(findDerivedModelsDto: FindDerivedModelsDto) {
    try {
      return await this.queryBus.execute<
        FindAllDerivedModelsQuery,
        DerivedModelResponseDto[]
      >(new FindAllDerivedModelsQuery(findDerivedModelsDto))
    } catch (error) {
      throw error
    }
  }

  async findOneDerivedModel(modelId: string) {
    try {
      return await this.queryBus.execute<
        FindOneDerivedModelQuery,
        DerivedModelResponseDto
      >(new FindOneDerivedModelQuery(modelId))
    } catch (error) {
      throw error
    }
  }
}
