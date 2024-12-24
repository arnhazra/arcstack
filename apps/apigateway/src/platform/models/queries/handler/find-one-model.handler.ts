import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ModelsRepository } from "../../models.repository"
import { FindOneModelQuery } from "../impl/find-one-model.query"
import { Model } from "../../schemas/model.schema"

@QueryHandler(FindOneModelQuery)
export class FindOneModelQueryHandler
  implements IQueryHandler<FindOneModelQuery>
{
  constructor(private readonly modelRepository: ModelsRepository) {}

  async execute(query: FindOneModelQuery): Promise<Model> {
    const { modelId } = query
    return await this.modelRepository.findOne({ _id: modelId })
  }
}
