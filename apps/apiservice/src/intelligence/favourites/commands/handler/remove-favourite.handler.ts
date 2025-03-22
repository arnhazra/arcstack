import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { FavouritesRepository } from "../../favourites.repository"
import { RemoveFavouriteCommand } from "../impl/remove-favourite.command"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(RemoveFavouriteCommand)
export class RemoveFavouriteCommandHandler
  implements ICommandHandler<RemoveFavouriteCommand>
{
  constructor(private readonly repository: FavouritesRepository) {}

  async execute(command: RemoveFavouriteCommand) {
    const { userId, modelId } = command
    return await this.repository.delete({
      userId: objectId(userId),
      derivedModel: objectId(modelId),
    })
  }
}
