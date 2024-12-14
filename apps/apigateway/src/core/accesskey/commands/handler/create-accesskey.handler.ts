import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateAccessKeyCommand } from "../impl/create-accesskey.command"
import { AccessKeyRepository } from "../../accesskey.repository"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateAccessKeyCommand)
export class CreateAccessKeyCommandHandler
  implements ICommandHandler<CreateAccessKeyCommand>
{
  constructor(private readonly repository: AccessKeyRepository) {}

  async execute(command: CreateAccessKeyCommand) {
    const { userId } = command
    return await this.repository.create({ userId: objectId(userId) })
  }
}
