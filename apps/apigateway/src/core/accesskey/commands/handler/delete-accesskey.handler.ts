import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { DeleteAccessKeyCommand } from "../impl/delete-accesskey.command"
import { AccessKeyRepository } from "../../accesskey.repository"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(DeleteAccessKeyCommand)
export class DeleteAccessKeyCommandHandler
  implements ICommandHandler<DeleteAccessKeyCommand>
{
  constructor(private readonly repository: AccessKeyRepository) {}

  async execute(command: DeleteAccessKeyCommand) {
    const { accesskeyId } = command
    return await this.repository.delete({ id: objectId(accesskeyId) })
  }
}
