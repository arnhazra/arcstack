import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAccessKeyQuery } from "../impl/find-accesskey.query"
import { AccessKeyRepository } from "../../accesskey.repository"

@QueryHandler(FindAccessKeyQuery)
export class FindAccessKeyQueryHandler
  implements IQueryHandler<FindAccessKeyQuery>
{
  constructor(private readonly repository: AccessKeyRepository) {}

  async execute(query: FindAccessKeyQuery) {
    const { accessKey } = query
    return await this.repository.findOne({ accessKey })
  }
}
