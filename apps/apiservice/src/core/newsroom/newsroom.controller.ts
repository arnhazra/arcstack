import { Controller, BadRequestException, Get } from "@nestjs/common"
import { NewsRoomService } from "./newsroom.service"

@Controller("newsroom")
export class NewsRoomController {
  constructor(private readonly service: NewsRoomService) {}

  @Get()
  async getNewsArticles() {
    try {
      return await this.service.getNewsArticles()
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
