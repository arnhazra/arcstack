import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ChatRepository } from "../../chat.repository"
import { GetUsageByUserIdQuery } from "../impl/get-usage-by-user-id.query"

@QueryHandler(GetUsageByUserIdQuery)
export class GetUsageByUserIdQueryHandler
  implements IQueryHandler<GetUsageByUserIdQuery>
{
  constructor(private readonly repository: ChatRepository) {}

  async execute(query: GetUsageByUserIdQuery) {
    const { userId } = query
    return await this.repository.getTodaysUsage(userId)
  }
}
