import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { FindUserByIdQuery } from "../impl/find-user-by-id.query"
import { User } from "../../schemas/user.schema"
import { Types } from "mongoose"

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryQueryHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly repository: UserRepository) { }

  async execute(query: FindUserByIdQuery): Promise<User> {
    const { userId } = query
    return await this.repository.findOne({ _id: new Types.ObjectId(userId) })
  }
}