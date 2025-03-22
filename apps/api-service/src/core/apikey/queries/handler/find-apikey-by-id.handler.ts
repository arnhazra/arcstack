import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAPIKeyByIdQuery } from "../impl/find-apikey-by-id.query"
import { APIKeyRepository } from "../../apikey.repository"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindAPIKeyByIdQuery)
export class FindAPIKeyByIdQueryHandler
  implements IQueryHandler<FindAPIKeyByIdQuery>
{
  constructor(private readonly repository: APIKeyRepository) {}

  async execute(query: FindAPIKeyByIdQuery) {
    const { apiKeyId } = query
    return await this.repository.findOne({
      _id: objectId(apiKeyId),
    })
  }
}
