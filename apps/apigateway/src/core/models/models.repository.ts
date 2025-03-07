import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { Model as BaseModel } from "./schemas/models.schema"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class ModelsRepository extends EntityRepository<BaseModel> {
  constructor(
    @InjectModel(Model.name, DbConnectionMap.Core)
    private baseModelModel: Model<BaseModel>
  ) {
    super(baseModelModel)
  }
}
