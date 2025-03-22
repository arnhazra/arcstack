import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { APIKey } from "./schemas/apikey.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class APIKeyRepository extends EntityRepository<APIKey> {
  constructor(
    @InjectModel(APIKey.name, DbConnectionMap.Core)
    private apiKeyModel: Model<APIKey>
  ) {
    super(apiKeyModel)
  }
}
