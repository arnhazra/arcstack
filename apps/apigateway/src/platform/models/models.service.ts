import { Injectable } from "@nestjs/common"
import { FindAllModelsDto } from "./dto/find-all-models.dto"
import { CreateModelDto } from "./dto/create-model.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateModelCommand } from "./commands/impl/create-model.command"
import { Model } from "./schemas/model.schema"
import { FindAllModelsQuery } from "./queries/impl/find-all-models.query"
import { FindOneModelQuery } from "./queries/impl/find-one-model.query"
import { BaseModel } from "../basemodels/schemas/basemodel.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"

@Injectable()
export class ModelsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventEmitter: EventEmitter2
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
      const model = await this.queryBus.execute<FindOneModelQuery, Model>(
        new FindOneModelQuery(modelId)
      )
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
