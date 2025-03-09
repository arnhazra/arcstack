import { Controller, Get, Redirect } from "@nestjs/common"
import { devUIUri, prodUIUri } from "@/shared/constants/other-constants"
import { config } from "@/config"

@Controller()
export class AppController {
  @Get("/")
  @Redirect(config.NODE_ENV === "development" ? devUIUri : prodUIUri, 302)
  redirectToUI() {
    return
  }
}
