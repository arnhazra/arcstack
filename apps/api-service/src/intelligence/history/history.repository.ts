import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { History } from "./schemas/history.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class HistoryRepository extends EntityRepository<History> {
  constructor(
    @InjectModel(History.name, DbConnectionMap.Intelligence)
    private historyModel: Model<History>
  ) {
    super(historyModel)
  }
}
