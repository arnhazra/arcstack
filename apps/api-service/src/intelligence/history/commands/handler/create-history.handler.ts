import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { HistoryRepository } from "../../history.repository"
import { CreateHistoryCommand } from "../impl/create-history.command"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryCommandHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(private readonly repository: HistoryRepository) {}

  async execute(command: CreateHistoryCommand) {
    const { userId, modelId } = command
    return await this.repository.create({
      userId: objectId(userId),
      derivedModel: objectId(modelId),
    })
  }
}
