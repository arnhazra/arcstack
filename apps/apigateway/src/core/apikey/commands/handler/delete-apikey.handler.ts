import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { DeleteAPIKeyCommand } from "../impl/delete-apikey.command"
import { APIKeyRepository } from "../../apikey.repository"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(DeleteAPIKeyCommand)
export class DeleteAPIKeyCommandHandler
  implements ICommandHandler<DeleteAPIKeyCommand>
{
  constructor(private readonly repository: APIKeyRepository) {}

  async execute(command: DeleteAPIKeyCommand) {
    const { apiKeyId } = command
    return await this.repository.delete({ _id: objectId(apiKeyId) })
  }
}
