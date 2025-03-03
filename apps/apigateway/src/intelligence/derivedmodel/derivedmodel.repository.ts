import { Injectable } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { Connection, Model } from "mongoose"
import { EntityRepository } from "@/shared/database/entity.repository"
import { FindDerivedModelsDto } from "./dto/request/find-dervied-models.request.dto"
import { User } from "@/core/user/schemas/user.schema"

@Injectable()
export class DerivedModelRepository extends EntityRepository<DerivedModel> {
  constructor(
    @InjectModel(DerivedModel.name, DbConnectionMap.Intelligence)
    private derivedModelModel: Model<DerivedModel>,
    @InjectConnection(DbConnectionMap.Core)
    private coreConnection: Connection
  ) {
    super(derivedModelModel)
  }

  async findUniqueCategories() {
    const filters = await this.derivedModelModel.find().distinct("category")
    filters.push("All")
    filters.sort()
    return filters
  }

  async findOneModel(modelId: string) {
    return await this.derivedModelModel
      .findById(modelId)
      .populate("baseModel")
      .populate({
        path: "modelOwner",
        model: this.coreConnection.model(User.name),
      })
      .lean()
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
        isPublic: true,
      })
      .populate("baseModel")
      .select("-systemPrompt")
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }
}
