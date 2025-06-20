import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindFilterCategoriesQuery } from "../../../basemodel/queries/impl/find-filter-categories.query"
import { BaseModelsRepository } from "../../basemodel.repository"

@QueryHandler(FindFilterCategoriesQuery)
export class FindFilterCategoriesQueryHandler
  implements IQueryHandler<FindFilterCategoriesQuery>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(query: FindFilterCategoriesQuery): Promise<string[]> {
    const categoryFilters = await this.repository.find().distinct("provider")
    categoryFilters.push("All")
    categoryFilters.sort()
    return categoryFilters
  }
}
