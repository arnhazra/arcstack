import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetActivityQuery } from "../impl/get-activity-count.query"
import { ActivityRepository } from "../../activity.repository"

@QueryHandler(GetActivityQuery)
export class GetActivityQueryHandler
  implements IQueryHandler<GetActivityQuery>
{
  constructor(private readonly repository: ActivityRepository) {}

  async execute(query: GetActivityQuery) {
    const { searchKeyword } = query.getCountDto
    const regex = new RegExp(searchKeyword, "i")
    const totalUsage = await this.repository.countDocuments({
      apiUri: { $regex: regex },
    })
    return { totalUsage }
  }
}
