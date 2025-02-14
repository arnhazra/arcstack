import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { BaseModel } from "./schemas/basemodel.schema"
import { Model } from "mongoose"
import { BaseRepository } from "@/shared/database/database.repository"

@Injectable()
export class BaseModelsRepository extends BaseRepository<BaseModel> {
  constructor(
    @InjectModel(BaseModel.name, DbConnectionMap.Platform)
    private baseModelModel: Model<BaseModel>
  ) {
    super(baseModelModel)
  }
}
