import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Collection } from "./schemas/collections.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class CollectionsRepository extends EntityRepository<Collection> {
  constructor(
    @InjectModel(Collection.name, DbConnectionMap.Intelligence)
    private collectionModel: Model<Collection>
  ) {
    super(collectionModel)
  }
}
