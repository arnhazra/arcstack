import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { IntelligenceRepository } from "../../intelligence.repository"
import { CreateThreadCommand } from "../impl/create-thread.command"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(CreateThreadCommand)
export class CreateThreadCommandHandler
  implements ICommandHandler<CreateThreadCommand>
{
  constructor(private readonly repository: IntelligenceRepository) {}

  async execute(command: CreateThreadCommand) {
    const { threadId, prompt, response } = command
    return await this.repository.create({
      threadId: objectId(threadId),
      prompt,
      response,
    })
  }
}
