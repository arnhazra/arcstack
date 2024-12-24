import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateModelCommand } from "../impl/create-model.command"
import { ModelsRepository } from "../../models.repository"

@CommandHandler(CreateModelCommand)
export class CreateModelCommandHandler
  implements ICommandHandler<CreateModelCommand>
{
  constructor(private readonly repository: ModelsRepository) {}

  async execute(command: CreateModelCommand) {
    const {
      baseModel,
      category,
      description,
      isFineTuned,
      isPro,
      promptStyle,
      responseFormat,
      series,
      systemPrompt,
      title,
      vendor,
    } = command.createModelDto
    return await this.repository.create({
      baseModel,
      category,
      description,
      isFineTuned,
      isPro,
      promptStyle,
      responseFormat,
      series,
      systemPrompt,
      title,
      vendor,
    })
  }
}
