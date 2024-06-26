import { Controller, BadRequestException, Get, Query } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService, private readonly eventEmitter: EventEmitter2) { }

  @Get("get")
  async getApiReferenceByProductName(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("productName") productName: string) {
    try {
      const docList = await this.apireferenceService.getApiReferenceByProductName(user.userId, productName)
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "apireference", method: "GET", api: "/apireference" })
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
