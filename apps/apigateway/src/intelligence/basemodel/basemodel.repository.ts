import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { BaseModel } from "./schemas/basemodel.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/database/entity.repository"

@Injectable()
export class BaseModelsRepository extends EntityRepository<BaseModel> {
  constructor(
    @InjectModel(BaseModel.name, DbConnectionMap.Platform)
    private baseModelModel: Model<BaseModel>
  ) {
    super(baseModelModel)
  }
}
