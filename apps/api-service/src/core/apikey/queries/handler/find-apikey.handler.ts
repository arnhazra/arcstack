import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAPIKeyQuery } from "../impl/find-apikey.query"
import { APIKeyRepository } from "../../apikey.repository"

@QueryHandler(FindAPIKeyQuery)
export class FindAPIKeyQueryHandler implements IQueryHandler<FindAPIKeyQuery> {
  constructor(private readonly repository: APIKeyRepository) {}

  async execute(query: FindAPIKeyQuery) {
    const { apiKey } = query
    return await this.repository.findOne({ apiKey })
  }
}
