import { Injectable, BadRequestException } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { statusMessages } from "@/shared/constants/status-messages"
import { GetModelsQuery } from "./queries/impl/get-models.query"
import { Model } from "./schemas/models.schema"

@Injectable()
export class ModelsService {
  constructor(private readonly qureryBus: QueryBus) {}

  async getModelConfig() {
    try {
      return await this.qureryBus.execute<GetModelsQuery, Model[]>(
        new GetModelsQuery()
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
