import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllModelsQuery } from "../impl/find-all-models.query"
import { ModelsRepository } from "../../models.repository"

@QueryHandler(FindAllModelsQuery)
export class FindAllModelsQueryHandler
  implements IQueryHandler<FindAllModelsQuery>
{
  constructor(private readonly repository: ModelsRepository) {}

  async execute(query: FindAllModelsQuery) {
    return await this.repository.findAllModels(query.findAllModelsDto)
  }
}
