import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateBaseModelCommand } from "../impl/create-base-model.command"
import { BaseModelsRepository } from "../../basemodel.repository"

@CommandHandler(CreateBaseModelCommand)
export class CreateBaseModelCommandHandler
  implements ICommandHandler<CreateBaseModelCommand>
{
  constructor(private readonly repository: BaseModelsRepository) {}

  async execute(command: CreateBaseModelCommand) {
    const {
      displayName,
      genericName,
      series,
      provider,
      contextWindow,
      parameters,
      isPro,
      description,
    } = command.createBaseModelDto
    return await this.repository.create({
      displayName,
      genericName,
      series,
      provider,
      contextWindow,
      parameters,
      description,
      isPro,
    })
  }
}
