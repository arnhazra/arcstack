import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllBaseModelsQuery } from "../impl/find-all-models.query"
import { BaseModelsRepository } from "../../basemodels.repository"

@QueryHandler(FindAllBaseModelsQuery)
export class FindAllBaseModelsQueryHandler
  implements IQueryHandler<FindAllBaseModelsQuery>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(query: FindAllBaseModelsQuery) {
    return await this.repository.findAll()
  }
}
