import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Query } from "./schemas/query.schema"
import { Model } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class IntelligenceRepository extends BaseRepository<Query> {
  constructor(
    @InjectModel(Query.name, DbConnectionMap.Intelligence)
    private queryModel: Model<Query>
  ) {
    super(queryModel)
  }
}
