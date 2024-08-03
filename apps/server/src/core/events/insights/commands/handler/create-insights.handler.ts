import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateInsightsCommand } from "../impl/create-insights.command"
import { InsightsRepository } from "../../insights.repository"
import { Insights } from "../../schemas/insights.schema"

@CommandHandler(CreateInsightsCommand)
export class CreateInsightsCommandHandler implements ICommandHandler<CreateInsightsCommand> {
  constructor(private readonly repository: InsightsRepository) { }

  async execute(command: CreateInsightsCommand): Promise<Insights> {
    return await this.repository.createInsights(command.createInsightsDto)
  }
}