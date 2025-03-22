import { Injectable } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { DerivedModel } from "./schemas/derivedmodel.schema"
import { Connection, Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"
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
}
