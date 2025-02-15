import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DerivedModelRepository } from "../../derivedmodel.repository"
import { FindFilterCategoriesQuery } from "../impl/find-filter-categories.query"

@QueryHandler(FindFilterCategoriesQuery)
export class FindFilterCategoriesQueryHandler
  implements IQueryHandler<FindFilterCategoriesQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindFilterCategoriesQuery): Promise<string[]> {
    return await this.repository.findUniqueCategories()
  }
}
