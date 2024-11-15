import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAllWorkspaceQuery } from "../impl/find-all-workspaces.query"
import { WorkspaceRepository } from "../../workspace.repository"
import { Types } from "mongoose"

@QueryHandler(FindAllWorkspaceQuery)
export class FindAllWorkspaceQueryHandler
  implements IQueryHandler<FindAllWorkspaceQuery>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(query: FindAllWorkspaceQuery) {
    const { userId } = query
    return await this.repository.findAll({
      userId: new Types.ObjectId(userId),
    })
  }
}