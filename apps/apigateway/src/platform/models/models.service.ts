import { Injectable } from "@nestjs/common"
import { FindDerivedModelsDto } from "./dto/find-dervied-models.dto"
import { CreateDerivedModelDto } from "./dto/create-derived-model.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateDerivedModelCommand } from "./commands/impl/create-derived-model.command"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { FindAllDerivedModelsQuery } from "./queries/impl/find-all-derived-models.query"
import { FindOneDerivedModelQuery } from "./queries/impl/find-one-derived-model.query"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { CreateBaseModelDto } from "./dto/create-base-model.dto"
import { BaseModel } from "./schemas/basemodel.schema"
import { CreateBaseModelCommand } from "./commands/impl/create-base-model.command"
import { FindAllBaseModelsQuery } from "./queries/impl/find-all-base-models.query"
import { FindOneBaseModelQuery } from "./queries/impl/find-one-base-model.query"

@Injectable()
export class ModelsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventEmitter: EventEmitter2
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
        DerivedModel[]
      >(new FindAllDerivedModelsQuery(findDerivedModelsDto))
    } catch (error) {
      throw error
    }
  }

  async findOneDerivedModel(modelId: string) {
    try {
      const model = await this.queryBus.execute<
        FindOneDerivedModelQuery,
        DerivedModel
      >(new FindOneDerivedModelQuery(modelId))
      const baseModelResponse: BaseModel[] = await this.eventEmitter.emitAsync(
        EventsUnion.GetBaseModelDetails,
        model.baseModel
      )

      return { model, baseModel: baseModelResponse[0] }
    } catch (error) {
      throw error
    }
  }
}
