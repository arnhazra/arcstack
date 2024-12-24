import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model as AIModel } from "./schemas/model.schema"
import { Model } from "mongoose"
import { BaseRepository } from "@/shared/database/database.repository"
import { FindAllModelsDto } from "./dto/find-all-models.dto"

@Injectable()
export class ModelsRepository extends BaseRepository<AIModel> {
  constructor(
    @InjectModel(AIModel.name, DbConnectionMap.Platform)
    private aiModelModel: Model<AIModel>
  ) {
    super(aiModelModel)
  }

  async findAllModels(findAllModelsDto: FindAllModelsDto) {
    const searchQuery = findAllModelsDto.searchQuery || ""
    const selectedFilterCategory =
      findAllModelsDto.selectedFilter === "All"
        ? ""
        : findAllModelsDto.selectedFilter
    const selectedSortOption = findAllModelsDto.selectedSortOption || "name"
    const offset = findAllModelsDto.offset || 0
    const limit = findAllModelsDto.limit || 30
    return await this.aiModelModel
      .find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
        category: { $regex: selectedFilterCategory },
      })
      .select("-systemPrompt")
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }
}
