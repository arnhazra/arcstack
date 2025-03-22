import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DerivedModelRepository } from "../../derivedmodel.repository"
import { FindMyBuildsQuery } from "../impl/find-my-builds.query"
import objectId from "@/shared/utils/convert-objectid"

@QueryHandler(FindMyBuildsQuery)
export class FindMyBuildsQueryHandler
  implements IQueryHandler<FindMyBuildsQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindMyBuildsQuery) {
    return await this.repository
      .find({ modelOwner: objectId(query.userId) })
      .populate("baseModel")
  }
}
