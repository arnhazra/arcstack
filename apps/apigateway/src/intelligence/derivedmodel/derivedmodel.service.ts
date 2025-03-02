import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { CreateDerivedModelDto } from "./dto/request/create-derived-model.request.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateDerivedModelCommand } from "./commands/impl/create-derived-model.command"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { FindAllDerivedModelsQuery } from "./queries/impl/find-all-derived-models.query"
import { FindOneDerivedModelQuery } from "./queries/impl/find-one-derived-model.query"
import { DerivedModelResponseDto } from "./dto/response/derived-model.response.dto"
import { FindFilterCategoriesQuery } from "./queries/impl/find-filter-categories.query"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"
import { FindMyBuildsQuery } from "./queries/impl/find-my-builds.query"

@Injectable()
export class DerivedModelService {
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

  async createDerivedModel(
    userId: string,
    createDerivedModelDto: CreateDerivedModelDto
  ) {
    try {
      return await this.commandBus.execute<
        CreateDerivedModelCommand,
        DerivedModel
      >(new CreateDerivedModelCommand(userId, createDerivedModelDto))
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

  async findMyBuilds(userId: string) {
    try {
      return await this.queryBus.execute<
        FindMyBuildsQuery,
        DerivedModelResponseDto[]
      >(new FindMyBuildsQuery(userId))
    } catch (error) {
      throw error
    }
  }

  @OnEvent(EventsUnion.GetDerivedModelDetails)
  async findOneDerivedModel(modelId: string) {
    try {
      const model = await this.queryBus.execute<
        FindOneDerivedModelQuery,
        DerivedModelResponseDto
      >(new FindOneDerivedModelQuery(modelId))

      if (model) {
        return model
      } else {
        throw new NotFoundException()
      }
    } catch (error) {
      throw error
    }
  }
}
