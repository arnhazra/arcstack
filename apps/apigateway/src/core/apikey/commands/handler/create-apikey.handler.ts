import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateAPIKeyCommand } from "../impl/create-apikey.command"
import { APIKeyRepository } from "../../apikey.repository"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateAPIKeyCommand)
export class CreateAPIKeyCommandHandler
  implements ICommandHandler<CreateAPIKeyCommand>
{
  constructor(private readonly repository: APIKeyRepository) {}

  async execute(command: CreateAPIKeyCommand) {
    const { userId } = command
    return await this.repository.create({ userId: objectId(userId) })
  }
}
