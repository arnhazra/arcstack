import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Thread } from "./schemas/thread.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class ChatRepository extends EntityRepository<Thread> {
  constructor(
    @InjectModel(Thread.name, DbConnectionMap.Intelligence)
    private threadModel: Model<Thread>
  ) {
    super(threadModel)
  }
}
