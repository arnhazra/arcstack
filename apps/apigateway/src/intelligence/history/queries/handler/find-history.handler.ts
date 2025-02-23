import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { HistoryRepository } from "../../history.repository"
import { FindHistoryQuery } from "../impl/find-history.query"

@QueryHandler(FindHistoryQuery)
export class FindHistoryQueryHandler
  implements IQueryHandler<FindHistoryQuery>
{
  constructor(private readonly repository: HistoryRepository) {}

  async execute(query: FindHistoryQuery) {
    const { userId } = query
    return await this.repository.findHistoryByUser(userId)
  }
}
