import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllAPIKeyQuery } from "../impl/find-all-apikeys.query"
import { APIKeyRepository } from "../../apikey.repository"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindAllAPIKeyQuery)
export class FindAllAPIKeyQueryHandler
  implements IQueryHandler<FindAllAPIKeyQuery>
{
  constructor(private readonly repository: APIKeyRepository) {}

  async execute(query: FindAllAPIKeyQuery) {
    const { userId } = query
    return await this.repository.find({
      userId: objectId(userId),
    })
  }
}
