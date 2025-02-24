import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "@/shared/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindAllAPIKeyQuery } from "./queries/impl/find-all-apikeys.query"
import { FindAPIKeyByIdQuery } from "./queries/impl/find-apikey-by-id.query"
import { APIKey } from "./schemas/apikey.schema"
import { DeleteAPIKeyCommand } from "./commands/impl/delete-apikey.command"
import { CreateAPIKeyCommand } from "./commands/impl/create-apikey.command"
import { FindAPIKeyQuery } from "./queries/impl/find-apikey.query"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"

@Injectable()
export class APIKeyService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @OnEvent(EventsUnion.CreateAPIKey)
  async createAPIKey(userId: string) {
    try {
      return await this.commandBus.execute<CreateAPIKeyCommand, APIKey>(
        new CreateAPIKeyCommand(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @OnEvent(EventsUnion.GetAPIKeys)
  async findMyAPIKeys(userId: string) {
    try {
      return await this.queryBus.execute<FindAllAPIKeyQuery, APIKey[]>(
        new FindAllAPIKeyQuery(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @OnEvent(EventsUnion.GetAPIKeyDetails)
  async findAPIKey(apiKey: string) {
    try {
      return await this.queryBus.execute<FindAPIKeyQuery, APIKey>(
        new FindAPIKeyQuery(apiKey)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async deleteAPIKey(reqUserId: string, apiKeyId: string) {
    try {
      const { userId } = await this.queryBus.execute<
        FindAPIKeyByIdQuery,
        APIKey
      >(new FindAPIKeyByIdQuery(apiKeyId))
      const myAPIKeys = await this.findMyAPIKeys(reqUserId)
      if (userId.toString() === reqUserId && myAPIKeys.length > 1) {
        await this.commandBus.execute(new DeleteAPIKeyCommand(apiKeyId))
        return { success: true }
      } else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
