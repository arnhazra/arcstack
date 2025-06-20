import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CollectionsRepository } from "../../collections.repository"
import { RemoveCollectionCommand } from "../impl/remove-from-collection.command"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(RemoveCollectionCommand)
export class RemoveCollectionCommandHandler
  implements ICommandHandler<RemoveCollectionCommand>
{
  constructor(private readonly repository: CollectionsRepository) {}

  async execute(command: RemoveCollectionCommand) {
    const { userId, modelId } = command
    return await this.repository.delete({
      userId: objectId(userId),
      baseModel: objectId(modelId),
    })
  }
}
