import { BadRequestException, Injectable } from "@nestjs/common"
import { generateResponse } from "./commands/generate-response.command"
import { saveResponse } from "./commands/save-response.command"

@Injectable()
export class CopilotService {
  async generateRecommendation(workspaceId: string, prompt: string, temperature: number, topP: number, topK: number) {
    try {
      const response = await generateResponse(prompt, temperature, topP, topK)
      await saveResponse(workspaceId, prompt, response.response)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
