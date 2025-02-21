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

  private isValidResponse(response: any[]): boolean {
    return (
      Array.isArray(response) &&
      response.length > 0 &&
      response[0] !== null &&
      response[0] !== undefined
    )
  }

  private createActivityLog(user: User, request: ModRequest): void {
    const userId = String(user._id)

    if (user.activityLog) {
      const { method, url: apiUri } = request
      this.eventEmitter.emit(EventsUnion.CreateActivity, {
        userId,
        method,
        apiUri,
      })
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const apiKey = request.headers["x-api-key"]

    try {
      if (!apiKey) {
        throw new ForbiddenException(statusMessages.noAPIKeyProvided)
      }

      const apiKeyResArr = await this.eventEmitter.emitAsync(
        EventsUnion.GetAPIKeyDetails,
        apiKey
      )

      if (!this.isValidResponse(apiKeyResArr)) {
        throw new ForbiddenException(statusMessages.invalidAPIKey)
      }

      const apiKeyRes: APIKey = apiKeyResArr.shift()
      const userId = String(apiKeyRes.userId)

      const userResArr = await this.eventEmitter.emitAsync(
        EventsUnion.GetUserDetails,
        { _id: userId }
      )

      if (!this.isValidResponse(userResArr)) {
        throw new ForbiddenException(statusMessages.invalidAPIKey)
      }

      const userRes: User = userResArr.shift()

      const subscriptionResArr: Subscription[] =
        await this.eventEmitter.emitAsync(
          EventsUnion.GetSubscriptionDetails,
          userId
        )

      if (!this.isValidResponse(subscriptionResArr)) {
        const threadCountResArr = await this.eventEmitter.emitAsync(
          EventsUnion.GetThreadCount,
          userId
        )
        if (!this.isValidResponse(threadCountResArr)) {
          throw new ForbiddenException(statusMessages.invalidAPIKey)
        }

        const threadCountRes: number = threadCountResArr.shift()

        if (!(threadCountRes < 200)) {
          throw new ForbiddenException(statusMessages.freeTierLimitReached)
        }

        request.user = { userId, role: userRes.role }
        this.createActivityLog(userRes, request)
        return true
      } else {
        request.user = { userId, role: userRes.role }
        this.createActivityLog(userRes, request)
        return true
      }
    } catch (error) {
      throw error
    }
  }
}
