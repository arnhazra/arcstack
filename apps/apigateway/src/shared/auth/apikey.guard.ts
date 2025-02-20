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
        throw new ForbiddenException(statusMessages.noAPIKeyProvided)
      } else {
        const apiKeyResponse: APIKey[] = await this.eventEmitter.emitAsync(
          EventsUnion.GetAPIKeyDetails,
          apiKey
        )

        if (
          !apiKeyResponse ||
          !apiKeyResponse.length ||
          (apiKeyResponse &&
            apiKeyResponse.length &&
            apiKeyResponse[0] === null)
        ) {
          throw new ForbiddenException(statusMessages.invalidAPIKey)
        } else {
          const apiKey = apiKeyResponse.shift()
          const userId = String(apiKey.userId)
          const userResponse: User[] = await this.eventEmitter.emitAsync(
            EventsUnion.GetUserDetails,
            { _id: userId }
          )

          if (
            !userResponse ||
            !userResponse.length ||
            (userResponse && userResponse.length && userResponse[0] === null)
          ) {
            throw new ForbiddenException(statusMessages.invalidAPIKey)
          } else {
            const user = userResponse.shift()
            const subscriptionRes: Subscription[] =
              await this.eventEmitter.emitAsync(
                EventsUnion.GetSubscriptionDetails,
                userId
              )

            if (
              !subscriptionRes ||
              !subscriptionRes.length ||
              (subscriptionRes &&
                subscriptionRes.length &&
                subscriptionRes[0] === null)
            ) {
              const threadCountRes: number[] =
                await this.eventEmitter.emitAsync(
                  EventsUnion.GetThreadCount,
                  userId
                )
              if (
                !threadCountRes ||
                !threadCountRes.length ||
                (threadCountRes &&
                  threadCountRes.length &&
                  threadCountRes[0] === null)
              ) {
                throw new ForbiddenException(statusMessages.invalidAPIKey)
              } else {
                const threadCount = threadCountRes.shift()

                if (threadCount < 200) {
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
                } else {
                  throw new ForbiddenException(
                    statusMessages.freeTierLimitReached
                  )
                }
              }
            } else {
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
