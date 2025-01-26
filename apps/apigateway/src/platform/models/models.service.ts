import { Injectable } from "@nestjs/common"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateDerivedModelCommand } from "./commands/impl/create-derived-model.command"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { FindAllDerivedModelsQuery } from "./queries/impl/find-all-derived-models.query"
import { FindOneDerivedModelQuery } from "./queries/impl/find-one-derived-model.query"
import { CreateBaseModelDto } from "./dto/request/create-base-model.request.dto"
import { BaseModel } from "./schemas/basemodel.schema"
import { CreateBaseModelCommand } from "./commands/impl/create-base-model.command"
import { FindAllBaseModelsQuery } from "./queries/impl/find-all-base-models.query"
import { FindOneBaseModelQuery } from "./queries/impl/find-one-base-model.query"
import { DerivedModelResponseDto } from "./dto/response/derived-model.response.dto"

@Injectable()
export class ModelsService {
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
