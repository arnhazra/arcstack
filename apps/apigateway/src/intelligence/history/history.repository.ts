import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { History } from "./schemas/history.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/database/entity.repository"
import objectId from "@/shared/utils/convert-objectid"

@Injectable()
export class HistoryRepository extends EntityRepository<History> {
  constructor(
    @InjectModel(History.name, DbConnectionMap.Platform)
    private historyModel: Model<History>
  ) {
    super(historyModel)
  }

  async findHistoryByUser(userId: string) {
    return await this.historyModel
      .find({ userId: objectId(userId) })
      .populate({
        path: "derivedModel",
        select: "-systemPrompt",
        populate: {
          path: "baseModel",
        },
      })
      .then((history) => {
        const seen = new Set()
        return history.filter((entry) => {
          const idStr = entry.derivedModel._id.toString()
          if (seen.has(idStr)) return false
          seen.add(idStr)
          return true
        })
      })
  }
}
