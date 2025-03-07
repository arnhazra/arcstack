import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FilterQuery, Model } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { EntityRepository } from "@/shared/entity/entity.repository"
import objectId from "src/shared/utils/convert-objectid"

@Injectable()
export class UserRepository extends EntityRepository<User> {
  constructor(
    @InjectModel(User.name, DbConnectionMap.Core)
    private userModel: Model<User>
  ) {
    super(userModel)
  }

  @OnEvent(EventsUnion.GetUserDetails)
  async findUser<K extends keyof User>(
    filter: Pick<User, K>
  ): Promise<User | null> {
    return await super.findOne(filter as FilterQuery<User>)
  }

  async updateOneById<K extends keyof User>(
    userId: string,
    key: K,
    value: User[K]
  ): Promise<User | null> {
    return await super.update({ _id: objectId(userId) }, { [key]: value })
  }
}
