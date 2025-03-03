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

  private async getAPIKey(apiKey: string): Promise<APIKey> {
    const apiKeyResArr = await this.eventEmitter.emitAsync(
      EventsUnion.GetAPIKeyDetails,
      apiKey
    )

    if (!this.isValidResponse(apiKeyResArr)) {
      throw new ForbiddenException(statusMessages.invalidAPIKey)
    }

    return apiKeyResArr.shift()
  }

  private async getUser(userId: string): Promise<User> {
    const userResArr = await this.eventEmitter.emitAsync(
      EventsUnion.GetUserDetails,
      { _id: userId }
    )

    if (!this.isValidResponse(userResArr)) {
      throw new ForbiddenException(statusMessages.invalidUser)
    }

    return userResArr.shift()
  }

  private async getSubscription(userId: string): Promise<Subscription> {
    const subscriptionResArr = await this.eventEmitter.emitAsync(
      EventsUnion.GetSubscriptionDetails,
      userId
    )

    if (!this.isValidResponse(subscriptionResArr)) {
      return null
    }

    return subscriptionResArr.shift()
  }

  private async getThreadCount(userId: string): Promise<number> {
    const threadCountResArr = await this.eventEmitter.emitAsync(
      EventsUnion.GetThreadCount,
      userId
    )

    if (!this.isValidResponse(threadCountResArr)) {
      return null
    }

    return threadCountResArr.shift()
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

  private async introduceDelay(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time))
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const apiKey = request.headers["x-api-key"]

    try {
      if (!apiKey) throw new ForbiddenException(statusMessages.noAPIKeyProvided)
      const apiKeyRes = await this.getAPIKey(apiKey.toString())
      const userId = String(apiKeyRes.userId)
      const userRes = await this.getUser(userId)
      const subscriptionRes = await this.getSubscription(userId)
      const threadCountRes = await this.getThreadCount(userId)
      const isSubscriptionActive =
        subscriptionRes && new Date(subscriptionRes.endsAt) > new Date()

      if (!subscriptionRes || !isSubscriptionActive) {
        if (threadCountRes >= 200) {
          throw new ForbiddenException(statusMessages.limitReached)
        }
        this.introduceDelay(1000)
        request.user = {
          userId,
          role: userRes.role,
          isSubscriptionActive: false,
        }
        this.createActivityLog(userRes, request)
        return true
      } else {
        request.user = {
          userId,
          role: userRes.role,
          isSubscriptionActive: true,
        }
        this.createActivityLog(userRes, request)
        return true
      }
    } catch (error) {
      throw error
    }
  }
}
