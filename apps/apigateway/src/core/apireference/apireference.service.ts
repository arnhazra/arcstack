import { BadRequestException, Injectable } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { FindAPIReferencesQuery } from "./queries/impl/find-apireferences.query"
import { ApiReference } from "./schemas/apireference.schema"

@Injectable()
export class ApiReferenceService {
  constructor(private readonly queryBus: QueryBus) {}

  async getApiReferenceByProductName(productName: string) {
    try {
      const data = await this.queryBus.execute<
        FindAPIReferencesQuery,
        ApiReference[]
      >(new FindAPIReferencesQuery(productName))
      if (!data.length) {
        throw new BadRequestException()
      }

      return data
    } catch (error) {
      throw error
    }
  }
}
