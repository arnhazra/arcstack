import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetModelsQuery } from "../impl/get-models.query"
import { ModelsRepository } from "../../models.repository"

@QueryHandler(GetModelsQuery)
export class GetModelsQueryHandler implements IQueryHandler<GetModelsQuery> {
  constructor(private readonly repository: ModelsRepository) {}

  async execute(query: GetModelsQuery) {
    return await this.repository.find()
  }
}
