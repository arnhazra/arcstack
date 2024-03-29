import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { getTokens } from "./queries/get-tokens.query"
import { createTransaction } from "./commands/create-tx.command"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"
import { envConfig } from "src/env.config"

@Injectable()
export class SwapService {
  constructor(private readonly httpService: HttpService) { }

  async getSwapTokenList(searchQuery: string) {
    try {
      const swapTokenConfig = await getTokens(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async transactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
