import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Thread } from "./schemas/thread.schema"
import { Model } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class IntelligenceRepository extends BaseRepository<Thread> {
  constructor(
    @InjectModel(Thread.name, DbConnectionMap.Platform)
    private threadModel: Model<Thread>
  ) {
    super(threadModel)
  }
}
