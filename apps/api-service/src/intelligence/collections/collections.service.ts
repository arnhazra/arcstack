import { BadRequestException, Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateCollectionCommand } from "./commands/impl/add-to-collection.command"
import { RemoveCollectionCommand } from "./commands/impl/remove-from-collection.command"
import { FindAllCollectionsQuery } from "./queries/impl/find-collection-list.query"
import { FindIfCollectedQuery } from "./queries/impl/find-if-collected.query"

@Injectable()
export class CollectionsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  async create(userId: string, modelId: string) {
    try {
      return await this.commandBus.execute(
        new CreateCollectionCommand(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string) {
    try {
      return await this.queryBus.execute(new FindAllCollectionsQuery(userId))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findIfCollected(userId: string, modelId: string) {
    try {
      return await this.queryBus.execute(
        new FindIfCollectedQuery(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(userId: string, modelId: string) {
    try {
      return await this.commandBus.execute(
        new RemoveCollectionCommand(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
