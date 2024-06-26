import { CreateInsightDto } from "../dto/create-insight.dto"
import { InsightsModel } from "../models/insights.model"

export default async function createInsightsCommand(createInsightDto: CreateInsightDto) {
  const { userId, module, method, api } = createInsightDto
  const insights = new InsightsModel({ userId, module, method, api })
  await insights.save()
}