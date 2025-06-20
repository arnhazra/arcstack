import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CollectionsRepository } from "../../collections.repository"
import { CreateCollectionCommand } from "../impl/add-to-collection.command"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateCollectionCommand)
export class CreateCollectionCommandHandler
  implements ICommandHandler<CreateCollectionCommand>
{
  constructor(private readonly repository: CollectionsRepository) {}

  async execute(command: CreateCollectionCommand) {
    const { userId, modelId } = command
    return await this.repository.create({
      userId: objectId(userId),
      baseModel: objectId(modelId),
    })
  }
}
