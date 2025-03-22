import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { ApiReference } from "./schemas/apireference.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class ApiReferenceRepository extends EntityRepository<ApiReference> {
  constructor(
    @InjectModel(ApiReference.name, DbConnectionMap.Core)
    private apiReferenceModel: Model<ApiReference>
  ) {
    super(apiReferenceModel)
  }
}
