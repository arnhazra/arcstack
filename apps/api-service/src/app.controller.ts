import { Controller, Get, Redirect } from "@nestjs/common"
import { devUIURI, prodUIURI } from "@/shared/constants/other-constants"
import { config } from "@/config"

@Controller()
export class AppController {
  @Get("/")
  @Redirect(config.NODE_ENV === "development" ? devUIURI : prodUIURI, 302)
  redirectToUI() {
    return
  }
}
