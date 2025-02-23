import { BadRequestException, Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateHistoryCommand } from "./commands/impl/create-history.command"
import { FindHistoryQuery } from "./queries/impl/find-history.query"

@Injectable()
export class HistoryService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  async create(userId: string, modelId: string) {
    try {
      return await this.commandBus.execute(
        new CreateHistoryCommand(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string) {
    try {
      return await this.queryBus.execute(new FindHistoryQuery(userId))
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
