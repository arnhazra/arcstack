import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAccessKeyByIdQuery } from "../impl/find-accesskey-by-id.query"
import { AccessKeyRepository } from "../../accesskey.repository"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindAccessKeyByIdQuery)
export class FindAccessKeyByIdQueryHandler
  implements IQueryHandler<FindAccessKeyByIdQuery>
{
  constructor(private readonly repository: AccessKeyRepository) {}

  async execute(query: FindAccessKeyByIdQuery) {
    const { accesskeyId } = query
    return await this.repository.findOne({
      _id: objectId(accesskeyId),
    })
  }
}
