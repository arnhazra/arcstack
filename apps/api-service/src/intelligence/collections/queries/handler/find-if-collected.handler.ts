import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { CollectionsRepository } from "../../collections.repository"
import { FindIfCollectedQuery } from "../impl/find-if-collected.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindIfCollectedQuery)
export class FindIfCollectedQueryHandler
  implements IQueryHandler<FindIfCollectedQuery>
{
  constructor(private readonly repository: CollectionsRepository) {}

  async execute(query: FindIfCollectedQuery) {
    const { userId, modelId } = query
    const res = await this.repository.findOne({
      userId: objectId(userId),
      derivedModel: objectId(modelId),
    })

    return { isCollected: !!res }
  }
}
