import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Favourite } from "./schemas/favourites.schema"
import { Model } from "mongoose"
import { EntityRepository } from "@/shared/database/entity.repository"
import objectId from "@/shared/utils/convert-objectid"

@Injectable()
export class FavouritesRepository extends EntityRepository<Favourite> {
  constructor(
    @InjectModel(Favourite.name, DbConnectionMap.Platform)
    private favouriteModel: Model<Favourite>
  ) {
    super(favouriteModel)
  }

  async findAllFavouritesByUser(userId: string) {
    return await this.favouriteModel
      .find({ userId: objectId(userId) })
      .populate({
        path: "derivedModel",
        select: "-systemPrompt",
        populate: {
          path: "baseModel",
        },
      })
  }
}
