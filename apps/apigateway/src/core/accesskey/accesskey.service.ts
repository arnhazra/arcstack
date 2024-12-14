import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindAllAccessKeyQuery } from "./queries/impl/find-all-accesskeys.query"
import { FindAccessKeyByIdQuery } from "./queries/impl/find-accesskey-by-id.query"
import { AccessKey } from "./schemas/accesskey.schema"
import { DeleteAccessKeyCommand } from "./commands/impl/delete-accesskey.command"
import { CreateAccessKeyCommand } from "./commands/impl/create-accesskey.command"
import { FindAccessKeyQuery } from "./queries/impl/find-accesskey.query"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "@/shared/utils/events.union"

@Injectable()
export class AccessKeyService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createAccessKey(userId: string) {
    try {
      return await this.commandBus.execute<CreateAccessKeyCommand, AccessKey>(
        new CreateAccessKeyCommand(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyAccessKeys(userId: string) {
    try {
      return await this.queryBus.execute<FindAllAccessKeyQuery, AccessKey[]>(
        new FindAllAccessKeyQuery(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @OnEvent(EventsUnion.GetAccessKeyDetails)
  async findAccessKey(accessKey: string) {
    try {
      return await this.queryBus.execute<FindAccessKeyQuery, AccessKey>(
        new FindAccessKeyQuery(accessKey)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async deleteAccessKey(reqUserId: string, accesskeyId: string) {
    try {
      const { userId } = await this.queryBus.execute<
        FindAccessKeyByIdQuery,
        AccessKey
      >(new FindAccessKeyByIdQuery(accesskeyId))

      if (userId.toString() === reqUserId) {
        await this.commandBus.execute(new DeleteAccessKeyCommand(accesskeyId))
        return { success: true }
      } else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
