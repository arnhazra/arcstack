import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { statusMessages } from "@/shared/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { APIKey } from "@/core/apikey/schemas/apikey.schema"
import { Subscription } from "src/core/subscription/schemas/subscription.schema"
import { User } from "@/core/user/schemas/user.schema"

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const apiKey = request.headers["x-api-key"]

    try {
      if (!apiKey) {
        throw new ForbiddenException(statusMessages.noCredentialsProvided)
      } else {
        const accessKeyResponse: APIKey[] = await this.eventEmitter.emitAsync(
          EventsUnion.GetAPIKeyDetails,
          {
            apiKey,
          }
        )

        if (
          !accessKeyResponse ||
          !accessKeyResponse.length ||
          (accessKeyResponse &&
            accessKeyResponse.length &&
            accessKeyResponse[0] === null)
        ) {
          throw new ForbiddenException(statusMessages.invalidCredentials)
        } else {
          const apiKey = accessKeyResponse.shift()
          const userId = String(apiKey.userId)
          const userResponse: User[] = await this.eventEmitter.emitAsync(
            EventsUnion.GetUserDetails,
            { _id: userId }
          )

          if (!userResponse || !userResponse.length) {
            throw new ForbiddenException(statusMessages.invalidCredentials)
          } else {
            const user = userResponse.shift()
            const subscriptionRes: Subscription[] =
              await this.eventEmitter.emitAsync(
                EventsUnion.GetSubscriptionDetails,
                userId
              )

            if (!subscriptionRes || !subscriptionRes.length) {
              throw new ForbiddenException(statusMessages.subscriptionNotFound)
            } else {
              const subscription = subscriptionRes.shift()
              request.user = { userId, role: user.role }
              if (user.activityLog) {
                const { method, url: apiUri } = request
                this.eventEmitter.emit(EventsUnion.CreateActivity, {
                  userId,
                  method,
                  apiUri,
                })
              }

              return true
            }
          }
        }
      }
    } catch (error) {
      throw error
    }
  }
}
