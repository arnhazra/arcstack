import { BadRequestException, Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateFavouriteCommand } from "./commands/impl/create-favourite.command"
import { RemoveFavouriteCommand } from "./commands/impl/remove-favourite.command"
import { FindAllFavouritesQuery } from "./queries/impl/find-all-favourites.query"
import { FindIfFavouritedQuery } from "./queries/impl/find-if-favourited.query"

@Injectable()
export class FavouritesService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  async create(userId: string, modelId: string) {
    try {
      return await this.commandBus.execute(
        new CreateFavouriteCommand(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string) {
    try {
      return await this.queryBus.execute(new FindAllFavouritesQuery(userId))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findIfFavourited(userId: string, modelId: string) {
    try {
      return await this.queryBus.execute(
        new FindIfFavouritedQuery(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(userId: string, modelId: string) {
    try {
      return await this.commandBus.execute(
        new RemoveFavouriteCommand(userId, modelId)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
