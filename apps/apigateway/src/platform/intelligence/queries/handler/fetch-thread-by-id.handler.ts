import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IntelligenceRepository } from "../../intelligence.repository"
import { FetchThreadByIdQuery } from "../impl/fetch-thread-by-id.query"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FetchThreadByIdQuery)
export class FetchThreadByIdQueryHandler
  implements IQueryHandler<FetchThreadByIdQuery>
{
  constructor(private readonly repository: IntelligenceRepository) {}

  async execute(query: FetchThreadByIdQuery) {
    const { threadId } = query
    return await this.repository.findAll({
      threadId: objectId(threadId),
    })
  }
}
