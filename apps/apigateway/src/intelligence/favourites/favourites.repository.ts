import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Favourite } from "./schemas/favourites.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/entity/entity.repository"

@Injectable()
export class FavouritesRepository extends EntityRepository<Favourite> {
  constructor(
    @InjectModel(Favourite.name, DbConnectionMap.Intelligence)
    private favouriteModel: Model<Favourite>
  ) {
    super(favouriteModel)
  }
}
