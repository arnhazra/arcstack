import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { UpdateUsageInsightsSettingsCommand } from "../impl/update-usage-insights.command"
import { User } from "../../schemas/user.schema"

@CommandHandler(UpdateUsageInsightsSettingsCommand)
export class UpdateUsageInsightsSettingsCommandHandler implements ICommandHandler<UpdateUsageInsightsSettingsCommand> {
  constructor(private readonly repository: UserRepository) { }

  async execute(command: UpdateUsageInsightsSettingsCommand): Promise<User> {
    const { id, usageInsights } = command
    return await this.repository.updateOneById(id, "usageInsights", usageInsights)
  }
}