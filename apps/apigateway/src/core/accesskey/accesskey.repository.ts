import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { AccessKey } from "./schemas/accesskey.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "@/shared/database/database.repository"

@Injectable()
export class AccessKeyRepository extends BaseRepository<AccessKey> {
  constructor(
    @InjectModel(AccessKey.name, DbConnectionMap.Core)
    private accessKeyModel: Model<AccessKey>
  ) {
    super(accessKeyModel)
  }
}
