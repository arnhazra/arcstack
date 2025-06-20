import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllBaseModelsQuery } from "../impl/find-all-base-models.query"
import { BaseModelsRepository } from "../../basemodel.repository"

@QueryHandler(FindAllBaseModelsQuery)
export class FindAllBaseModelsQueryHandler
  implements IQueryHandler<FindAllBaseModelsQuery>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(query: FindAllBaseModelsQuery) {
    const { findAllBaseModelsDto } = query
    const searchQuery = findAllBaseModelsDto.searchQuery || ""
    const selectedFilterCategory =
      findAllBaseModelsDto.selectedFilter === "All"
        ? ""
        : findAllBaseModelsDto.selectedFilter
    const selectedSortOption = findAllBaseModelsDto.selectedSortOption || "name"
    const offset = findAllBaseModelsDto.offset || 0
    const limit = findAllBaseModelsDto.limit || 30
    return await this.repository
      .find({
        $or: [
          { displayName: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
        provider: { $regex: selectedFilterCategory },
      })
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }
}
