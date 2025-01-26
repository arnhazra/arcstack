import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DerivedModelsRepository } from "../../repositories/derivedmodels.repository"
import { FindOneDerivedModelQuery } from "../impl/find-one-derived-model.query"
import { DerivedModel } from "../../schemas/derivedmodel.schema"

@QueryHandler(FindOneDerivedModelQuery)
export class FindOneDerivedModelQueryHandler
  implements IQueryHandler<FindOneDerivedModelQuery>
{
  constructor(private readonly repository: DerivedModelsRepository) {}

  async execute(query: FindOneDerivedModelQuery): Promise<DerivedModel> {
    const { modelId } = query
    return (await this.repository.findOne({ _id: modelId })).populate(
      "baseModel"
    )
  }
}
