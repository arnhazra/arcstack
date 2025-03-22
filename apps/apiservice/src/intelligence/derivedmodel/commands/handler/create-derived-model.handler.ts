import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateDerivedModelCommand } from "../impl/create-derived-model.command"
import { DerivedModelRepository } from "../../derivedmodel.repository"
import objectId from "@/shared/utils/convert-objectid"

@CommandHandler(CreateDerivedModelCommand)
export class CreateDerivedModelCommandHandler
  implements ICommandHandler<CreateDerivedModelCommand>
{
  constructor(private readonly repository: DerivedModelRepository) {}

  async execute(command: CreateDerivedModelCommand) {
    const {
      baseModel,
      category,
      description,
      systemPrompt,
      displayName,
      isPublic,
    } = command.createDerivedModelDto
    return await this.repository.create({
      baseModel: objectId(baseModel),
      category,
      description,
      systemPrompt,
      displayName,
      modelOwner: objectId(command.userId),
      isPublic,
    })
  }
}
