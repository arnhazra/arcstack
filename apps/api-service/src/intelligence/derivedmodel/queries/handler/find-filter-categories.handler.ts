import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DerivedModelRepository } from "../../derivedmodel.repository"
import { FindFilterCategoriesQuery } from "../impl/find-filter-categories.query"

@QueryHandler(FindFilterCategoriesQuery)
export class FindFilterCategoriesQueryHandler
  implements IQueryHandler<FindFilterCategoriesQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindFilterCategoriesQuery): Promise<string[]> {
    const categoryFilters = await this.repository.find().distinct("category")
    categoryFilters.push("All")
    categoryFilters.sort()
    return categoryFilters
  }
}
