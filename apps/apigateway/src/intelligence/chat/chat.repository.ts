import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Thread } from "./schemas/thread.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/database/entity.repository"
import objectId from "@/shared/utils/convert-objectid"

@Injectable()
export class ChatRepository extends EntityRepository<Thread> {
  constructor(
    @InjectModel(Thread.name, DbConnectionMap.Platform)
    private threadModel: Model<Thread>
  ) {
    super(threadModel)
  }

  getTodaysUsage(userId: string) {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    return this.threadModel
      .countDocuments({
        userId: objectId(userId),
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      })
      .exec()
  }
}
