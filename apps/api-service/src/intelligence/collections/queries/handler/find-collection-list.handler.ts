import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { CollectionsRepository } from "../../collections.repository"
import { FindAllCollectionsQuery } from "../impl/find-collection-list.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindAllCollectionsQuery)
export class FindAllCollectionsQueryHandler
  implements IQueryHandler<FindAllCollectionsQuery>
{
  constructor(private readonly repository: CollectionsRepository) {}

  async execute(query: FindAllCollectionsQuery) {
    const { userId } = query
    return await this.repository.find({ userId: objectId(userId) }).populate({
      path: "baseModel",
    })
  }
}
