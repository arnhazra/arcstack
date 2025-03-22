import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { FavouritesRepository } from "../../favourites.repository"
import { CreateFavouriteCommand } from "../impl/create-favourite.command"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateFavouriteCommand)
export class CreateFavouriteCommandHandler
  implements ICommandHandler<CreateFavouriteCommand>
{
  constructor(private readonly repository: FavouritesRepository) {}

  async execute(command: CreateFavouriteCommand) {
    const { userId, modelId } = command
    return await this.repository.create({
      userId: objectId(userId),
      derivedModel: objectId(modelId),
    })
  }
}
