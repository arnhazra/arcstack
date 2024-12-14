import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllAccessKeyQuery } from "../impl/find-all-accesskeys.query"
import { AccessKeyRepository } from "../../accesskey.repository"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindAllAccessKeyQuery)
export class FindAllAccessKeyQueryHandler
  implements IQueryHandler<FindAllAccessKeyQuery>
{
  constructor(private readonly repository: AccessKeyRepository) {}

  async execute(query: FindAllAccessKeyQuery) {
    const { userId } = query
    return await this.repository.findAll({
      userId: objectId(userId),
    })
  }
}
