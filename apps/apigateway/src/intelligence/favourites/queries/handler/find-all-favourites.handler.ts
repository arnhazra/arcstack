import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FavouritesRepository } from "../../favourites.repository"
import { FindAllFavouritesQuery } from "../impl/find-all-favourites.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindAllFavouritesQuery)
export class FindAllFavouritesQueryHandler
  implements IQueryHandler<FindAllFavouritesQuery>
{
  constructor(private readonly repository: FavouritesRepository) {}

  async execute(query: FindAllFavouritesQuery) {
    const { userId } = query
    return await this.repository.find({ userId: objectId(userId) }).populate({
      path: "derivedModel",
      select: "-systemPrompt",
      populate: {
        path: "baseModel",
      },
    })
  }
}
