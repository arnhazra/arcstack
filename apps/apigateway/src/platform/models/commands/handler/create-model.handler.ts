import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateModelCommand } from "../impl/create-model.command"
import { ModelsRepository } from "../../models.repository"
import objectId from "@/shared/utils/convert-objectid"

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
      systemPrompt,
      title,
    } = command.createModelDto
    return await this.repository.create({
      baseModel: objectId(baseModel),
      category,
      description,
      isFineTuned,
      isPro,
      promptStyle,
      responseFormat,
      systemPrompt,
      title,
    })
  }
}
