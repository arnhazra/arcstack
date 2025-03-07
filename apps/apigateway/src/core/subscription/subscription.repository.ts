import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Subscription } from "./schemas/subscription.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class SubscriptionRepository extends EntityRepository<Subscription> {
  constructor(
    @InjectModel(Subscription.name, DbConnectionMap.Core)
    private subscriptionModel: Model<Subscription>
  ) {
    super(subscriptionModel)
  }
}
