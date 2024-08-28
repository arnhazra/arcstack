import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CopilotRepository } from "../../copilot.repository"
import { CreateQueryCommand } from "../impl/create-query.command"

@CommandHandler(CreateQueryCommand)
export class CreateQueryCommandHandler implements ICommandHandler<CreateQueryCommand> {
  constructor(private readonly repository: CopilotRepository) { }

  async execute(command: CreateQueryCommand) {
    const { orgId, prompt, response } = command
    return await this.repository.createOne(orgId, prompt, response)
  }
}