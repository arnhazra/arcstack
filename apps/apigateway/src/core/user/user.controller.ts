import { Controller, Post, Body, BadRequestException, Get, Patch, Request, UseGuards, Param } from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("generatepasskey")
  async generatePasskey(@Body() generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { user, hash } = await this.userService.generatePasskey(generateAuthPasskeyDto)
      if (!user) return { hash, message: statusMessages.passKeyEmail, newUser: true }
      return { hash, message: statusMessages.passKeyEmail, newUser: false }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("verifypasskey")
  async verifyPasskey(@Body() verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const response = await this.userService.verifyPasskey(verifyAuthPasskeyDto)
      const { accessToken, refreshToken, user } = response

      if (response.success) {
        return { accessToken, refreshToken, user }
      }

      else {
        throw new BadRequestException(statusMessages.invalidPassKey)
      }
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get("userdetails")
  async getUserDetails(@Request() request: ModRequest) {
    try {
      const { user, organization } = await this.userService.getUserDetails(request.user.userId, request.user.orgId)

      if (user) {
        return { user, organization }
      }

      else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }

  @UseGuards(TokenGuard)
  @Post("signout")
  async signOut(@Request() request: ModRequest) {
    try {
      await this.userService.signOut(request.user.userId)
      return { message: statusMessages.signOutSuccess }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Patch("attribute/:attributeName/:attributeValue")
  async updateAttribute(@Request() request: ModRequest, @Param() params: any) {
    try {
      const { attributeName, attributeValue } = params
      return await this.userService.updateAttribute(request.user.userId, attributeName, attributeValue)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
