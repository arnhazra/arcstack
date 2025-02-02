import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllDerivedModelsQuery } from "../impl/find-all-derived-models.query"
import { DerivedModelRepository } from "../../derivedmodel.repository"

@QueryHandler(FindAllDerivedModelsQuery)
export class FindAllDerivedModelsQueryHandler
  implements IQueryHandler<FindAllDerivedModelsQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindAllDerivedModelsQuery) {
    return await this.repository.findAllModels(query.findAllDerivedModelsDto)
  }
}
