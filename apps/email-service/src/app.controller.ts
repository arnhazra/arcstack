import { Controller } from "@nestjs/common"
import { SendEmailDto } from "./dto/send-email.dto"
import { MessagePattern } from "@nestjs/microservices"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern("sendEmail")
  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      await this.service.sendEmail(sendEmailDto)
      return { success: true }
    } catch (error) {
      return {
        success: false,
      }
    }
  }
}
