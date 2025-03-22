import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FavouritesRepository } from "../../favourites.repository"
import { FindIfFavouritedQuery } from "../impl/find-if-favourited.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindIfFavouritedQuery)
export class FindIfFavouritedQueryHandler
  implements IQueryHandler<FindIfFavouritedQuery>
{
  constructor(private readonly repository: FavouritesRepository) {}

  async execute(query: FindIfFavouritedQuery) {
    const { userId, modelId } = query
    const res = await this.repository.findOne({
      userId: objectId(userId),
      derivedModel: objectId(modelId),
    })

    return { isFavourited: !!res }
  }
}
