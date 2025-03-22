import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ChatRepository } from "../../chat.repository"
import { GetUsageByUserIdQuery } from "../impl/get-usage-by-user-id.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(GetUsageByUserIdQuery)
export class GetUsageByUserIdQueryHandler
  implements IQueryHandler<GetUsageByUserIdQuery>
{
  constructor(private readonly repository: ChatRepository) {}

  async execute(query: GetUsageByUserIdQuery) {
    const { userId } = query

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    return this.repository.countDocuments({
      userId: objectId(userId),
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })
  }
}
