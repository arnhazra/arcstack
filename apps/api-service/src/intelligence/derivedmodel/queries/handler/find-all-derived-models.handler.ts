import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllDerivedModelsQuery } from "../impl/find-all-derived-models.query"
import { DerivedModelRepository } from "../../derivedmodel.repository"

@QueryHandler(FindAllDerivedModelsQuery)
export class FindAllDerivedModelsQueryHandler
  implements IQueryHandler<FindAllDerivedModelsQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindAllDerivedModelsQuery) {
    const { findAllDerivedModelsDto } = query
    const searchQuery = findAllDerivedModelsDto.searchQuery || ""
    const selectedFilterCategory =
      findAllDerivedModelsDto.selectedFilter === "All"
        ? ""
        : findAllDerivedModelsDto.selectedFilter
    const selectedSortOption =
      findAllDerivedModelsDto.selectedSortOption || "name"
    const offset = findAllDerivedModelsDto.offset || 0
    const limit = findAllDerivedModelsDto.limit || 30
    return await this.repository
      .find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
        category: { $regex: selectedFilterCategory },
        isPublic: true,
      })
      .populate("baseModel")
      .select("-systemPrompt")
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }
}
