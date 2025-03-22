import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { HistoryRepository } from "../../history.repository"
import { FindHistoryQuery } from "../impl/find-history.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindHistoryQuery)
export class FindHistoryQueryHandler
  implements IQueryHandler<FindHistoryQuery>
{
  constructor(private readonly repository: HistoryRepository) {}

  async execute(query: FindHistoryQuery) {
    const { userId } = query
    return await this.repository
      .find({ userId: objectId(userId) })
      .populate({
        path: "derivedModel",
        select: "-systemPrompt",
        populate: {
          path: "baseModel",
        },
      })
      .then((history) => {
        const seen = new Set()
        return history.filter((entry) => {
          const derivedModel = entry.derivedModel
          if (!derivedModel) return false

          const idStr = derivedModel._id?.toString()
          if (!idStr || seen.has(idStr)) return false

          seen.add(idStr)
          return true
        })
      })
  }
}
