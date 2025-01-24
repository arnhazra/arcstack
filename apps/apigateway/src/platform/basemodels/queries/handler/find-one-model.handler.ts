import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BaseModelsRepository } from "../../basemodels.repository"
import { FindOneBaseModelQuery } from "../impl/find-one-model.query"
import { BaseModel } from "../../schemas/basemodel.schema"

@QueryHandler(FindOneBaseModelQuery)
export class FindOneBaseModelQueryHandler
  implements IQueryHandler<FindOneBaseModelQuery>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(query: FindOneBaseModelQuery): Promise<BaseModel> {
    const { modelId } = query
    return await this.repository.findOne({ _id: modelId })
  }
}
