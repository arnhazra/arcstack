import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { DerivedModel } from "../schemas/derivedmodel.schema"
import { Model } from "mongoose"
import { BaseRepository } from "@/shared/database/database.repository"
import { FindDerivedModelsDto } from "../dto/request/find-dervied-models.request.dto"

@Injectable()
export class DerivedModelsRepository extends BaseRepository<DerivedModel> {
  constructor(
    @InjectModel(DerivedModel.name, DbConnectionMap.Platform)
    private derivedModelModel: Model<DerivedModel>
  ) {
    super(derivedModelModel)
  }

  async findOneModel(modelId: string) {
    return await this.derivedModelModel
      .findById(modelId)
      .populate("baseModel")
      .select("-systemPrompt")
  }

  async findAllModels(findDerivedModelsDto: FindDerivedModelsDto) {
    const searchQuery = findDerivedModelsDto.searchQuery || ""
    const selectedFilterCategory =
      findDerivedModelsDto.selectedFilter === "All"
        ? ""
        : findDerivedModelsDto.selectedFilter
    const selectedSortOption = findDerivedModelsDto.selectedSortOption || "name"
    const offset = findDerivedModelsDto.offset || 0
    const limit = findDerivedModelsDto.limit || 30
    return await this.derivedModelModel
      .find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
        category: { $regex: selectedFilterCategory },
      })
      .populate("baseModel")
      .select("-systemPrompt")
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }
}
