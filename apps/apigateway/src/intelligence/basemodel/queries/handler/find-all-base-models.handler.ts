import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllBaseModelsQuery } from "../impl/find-all-base-models.query"
import { BaseModelsRepository } from "../../basemodel.repository"
import { BaseModel } from "../../schemas/basemodel.schema"

@QueryHandler(FindAllBaseModelsQuery)
export class FindAllBaseModelsQueryHandler
  implements IQueryHandler<FindAllBaseModelsQuery>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(query: FindAllBaseModelsQuery): Promise<BaseModel[]> {
    return await this.repository.find()
  }
}
