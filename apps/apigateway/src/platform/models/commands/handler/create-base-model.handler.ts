import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateBaseModelCommand } from "../impl/create-base-model.command"
import { BaseModelsRepository } from "../../repositories/basemodels.repository"

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
      vendor,
      contextWindow,
      parameters,
      architecture,
    } = command.createBaseModelDto
    return await this.repository.create({
      displayName,
      genericName,
      series,
      vendor,
      contextWindow,
      parameters,
      architecture,
    })
  }
}
