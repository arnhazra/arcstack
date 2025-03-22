import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateOTPDto } from "./dto/generate-otp.dto"
import { VerifyOTPDto } from "./dto/validate-otp.dto"
import * as jwt from "jsonwebtoken"
import { config } from "src/config"
import {
  generateOTP,
  verifyOTP,
  generateOTPEmailBody,
  generateOTPEmailSubject,
} from "./user.util"
import { prodUIURI } from "@/shared/constants/other-constants"
import { statusMessages } from "@/shared/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindUserByEmailQuery } from "./queries/impl/find-user-by-email.query"
import { User } from "./schemas/user.schema"
import { FindUserByIdQuery } from "./queries/impl/find-user-by-id.query"
import { CreateUserCommand } from "./commands/impl/create-user.command"
import {
  AttributeNames,
  UpdateAttributeCommand,
} from "./commands/impl/update-attribute.command"
import { randomUUID } from "crypto"
import { Subscription } from "../subscription/schemas/subscription.schema"

@Injectable()
export class UserService {
  private readonly jwtSecret: string

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.jwtSecret = config.JWT_SECRET
  }

  async generateOTP(generateOTPDto: GenerateOTPDto) {
    try {
      const { email } = generateOTPDto
      const user = await this.queryBus.execute<FindUserByEmailQuery, User>(
        new FindUserByEmailQuery(email)
      )
      const { fullHash: hash, otp } = generateOTP(email)
      const subject: string = generateOTPEmailSubject()
      const body: string = generateOTPEmailBody(otp)
      await this.eventEmitter.emitAsync(EventsUnion.SendEmail, {
        email,
        subject,
        body,
      })
      return { user, hash }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    try {
      const { email, hash, otp, name } = verifyOTPDto
      const isOTPValid = verifyOTP(email, hash, otp)

      if (isOTPValid) {
        const user = await this.queryBus.execute<FindUserByEmailQuery, User>(
          new FindUserByEmailQuery(email)
        )

        if (user) {
          const refreshTokenFromRedis = await this.eventEmitter.emitAsync(
            EventsUnion.GetToken,
            { userId: user.id }
          )

          const apiKeys = (
            await this.eventEmitter.emitAsync(EventsUnion.GetAPIKeys, user.id)
          ).shift()

          if (!apiKeys || !apiKeys.length) {
            await this.eventEmitter.emitAsync(EventsUnion.CreateAPIKey, user.id)
          }

          if (refreshTokenFromRedis.toString()) {
            const refreshToken = refreshTokenFromRedis.toString()
            const tokenPayload = {
              id: user.id,
              email: user.email,
              iss: prodUIURI,
            }
            const accessToken = jwt.sign(tokenPayload, this.jwtSecret, {
              algorithm: "HS512",
              expiresIn: "5m",
            })
            return { accessToken, refreshToken, user, success: true }
          } else {
            const tokenPayload = {
              id: user.id,
              email: user.email,
              iss: prodUIURI,
            }
            const accessToken = jwt.sign(tokenPayload, this.jwtSecret, {
              algorithm: "HS512",
              expiresIn: "5m",
            })
            const refreshToken = `rt_as-${randomUUID()}`
            await this.eventEmitter.emitAsync(EventsUnion.SetToken, {
              userId: user.id,
              token: refreshToken,
            })
            return { accessToken, refreshToken, user, success: true }
          }
        } else {
          const newUser = await this.commandBus.execute<
            CreateUserCommand,
            User
          >(new CreateUserCommand(email, name))

          const tokenPayload = {
            id: newUser.id,
            email: newUser.email,
            iss: prodUIURI,
          }
          const accessToken = jwt.sign(tokenPayload, this.jwtSecret, {
            algorithm: "HS512",
            expiresIn: "5m",
          })
          const refreshToken = `rt_as-${randomUUID()}`
          await this.eventEmitter.emitAsync(EventsUnion.SetToken, {
            userId: newUser.id,
            token: refreshToken,
          })
          await this.eventEmitter.emitAsync(
            EventsUnion.CreateAPIKey,
            newUser.id
          )
          return { accessToken, refreshToken, user: newUser, success: true }
        }
      } else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getUserDetails(userId: string) {
    try {
      const user = await this.queryBus.execute<FindUserByIdQuery, User>(
        new FindUserByIdQuery(userId)
      )

      if (user) {
        const subscriptionRes: Subscription[] =
          await this.eventEmitter.emitAsync(
            EventsUnion.GetSubscriptionDetails,
            userId
          )

        let subscription: Subscription | null

        if (!subscriptionRes || !subscriptionRes.length) {
          subscription = null
        } else {
          subscription = subscriptionRes.shift()
        }

        const isSubscriptionActive =
          subscription && new Date(subscription.endsAt) > new Date()

        return { user, subscription, isSubscriptionActive }
      } else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async signOut(userId: string) {
    try {
      await this.eventEmitter.emitAsync(EventsUnion.DeleteToken, { userId })
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateAttribute(
    userId: string,
    attributeName: AttributeNames,
    attributeValue: string
  ) {
    try {
      await this.commandBus.execute<UpdateAttributeCommand, User>(
        new UpdateAttributeCommand(userId, attributeName, attributeValue)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
