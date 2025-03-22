import { Controller, Get } from "@nestjs/common"
import { ModelsService } from "./models.service"

@Controller("getmodels")
export class ModelsController {
  constructor(private readonly service: ModelsService) {}

  @Get()
  async getModelConfig() {
    try {
      const models = await this.service.getModelConfig()
      return models
    } catch (error) {
      throw error
    }
  }
}
