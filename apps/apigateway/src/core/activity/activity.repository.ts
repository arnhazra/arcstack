import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Activity } from "./schemas/activity.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class ActivityRepository extends EntityRepository<Activity> {
  constructor(
    @InjectModel(Activity.name, DbConnectionMap.Core)
    private activityModel: Model<Activity>
  ) {
    super(activityModel)
  }
}
