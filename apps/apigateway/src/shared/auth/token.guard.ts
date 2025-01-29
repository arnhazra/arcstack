import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import { statusMessages } from "@/shared/constants/status-messages"
import { envConfig } from "src/config"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "../utils/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "@/core/user/schemas/user.schema"
import { Response } from "express"
import { tokenIssuer } from "@/shared/constants/other-constants"

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const globalResponse: Response = context.switchToHttp().getResponse()
    const accessToken = request.headers["authorization"]?.split(" ")[1]
    const refreshToken = request.headers["refresh_token"]

    try {
      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException(statusMessages.unauthorized)
      } else {
        const decodedAccessToken = jwt.verify(
          accessToken,
          envConfig.accessTokenPublicKey,
          { algorithms: ["RS512"] }
        )
        const userId = (decodedAccessToken as any).id
        const userResponse: User[] = await this.eventEmitter.emitAsync(
          EventsUnion.GetUserDetails,
          { _id: userId }
        )

        if (!userResponse || !userResponse.length) {
          throw new UnauthorizedException(statusMessages.unauthorized)
        } else {
          const { activityLog } = userResponse.shift()
          request.user = { userId }

          if (activityLog) {
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
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        const decodedAccessToken = jwt.decode(String(accessToken))
        const userId = (decodedAccessToken as any).id
        const refreshTokenFromRedis: String[] =
          await this.eventEmitter.emitAsync(EventsUnion.GetToken, { userId })

        if (
          !refreshTokenFromRedis ||
          !refreshTokenFromRedis.length ||
          refreshToken !== refreshTokenFromRedis[0]
        ) {
          throw new UnauthorizedException(statusMessages.unauthorized)
        } else {
          const user: User[] = await this.eventEmitter.emitAsync(
            EventsUnion.GetUserDetails,
            { _id: userId }
          )
          const { activityLog, email } = user[0]
          request.user = { userId }

          if (activityLog) {
            const { method, url: apiUri } = request
            this.eventEmitter.emit(EventsUnion.CreateActivity, {
              userId,
              method,
              apiUri,
            })
          }

          const tokenPayload = {
            id: userId,
            email,
            iss: tokenIssuer,
          }
          const newAccessToken = jwt.sign(
            tokenPayload,
            envConfig.accessTokenPrivateKey,
            { algorithm: "RS512", expiresIn: "5m" }
          )
          globalResponse.setHeader("token", newAccessToken)
          return true
        }
      } else {
        throw new UnauthorizedException(statusMessages.unauthorized)
      }
    }
  }
}
