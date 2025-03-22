import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DerivedModelRepository } from "../../derivedmodel.repository"
import { FindOneDerivedModelQuery } from "../impl/find-one-derived-model.query"
import { DerivedModel } from "../../schemas/derivedmodel.schema"

@QueryHandler(FindOneDerivedModelQuery)
export class FindOneDerivedModelQueryHandler
  implements IQueryHandler<FindOneDerivedModelQuery>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(query: FindOneDerivedModelQuery): Promise<DerivedModel> {
    const { modelId } = query
    return await this.repository.findOneModel(modelId)
  }
}
