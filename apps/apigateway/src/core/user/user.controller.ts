import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Patch,
  Request,
  UseGuards,
  Param,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateOTPDto } from "./dto/generate-otp.dto"
import { VerifyOTPDto } from "./dto/validate-otp.dto"
import { statusMessages } from "@/shared/constants/status-messages"
import { TokenGuard } from "@/shared/auth/token.guard"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("generateotp")
  async generateOTP(@Body() generateOTPDto: GenerateOTPDto) {
    try {
      const { user, hash } = await this.userService.generateOTP(generateOTPDto)
      if (!user)
        return { hash, message: statusMessages.otpEmail, newUser: true }
      return { hash, message: statusMessages.otpEmail, newUser: false }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("validateotp")
  async validateOTP(@Body() validateOTPDto: VerifyOTPDto) {
    try {
      const response = await this.userService.verifyOTP(validateOTPDto)
      const { accessToken, refreshToken, user } = response

      if (response.success) {
        return { accessToken, refreshToken, user }
      } else {
        throw new BadRequestException(statusMessages.invalidOTP)
      }
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get("userdetails")
  async getUserDetails(@Request() request: ModRequest) {
    try {
      const { user, subscription, isSubscriptionActive } =
        await this.userService.getUserDetails(request.user.userId)

      if (user) {
        return { user, subscription, isSubscriptionActive }
      } else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }

  @UseGuards(TokenGuard)
  @Post("signout")
  async signOut(@Request() request: ModRequest) {
    try {
      await this.userService.signOut(request.user.userId)
      return { message: statusMessages.signOutSuccess }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Patch("attribute/:attributeName/:attributeValue")
  async updateAttribute(@Request() request: ModRequest, @Param() params: any) {
    try {
      const { attributeName, attributeValue } = params
      return await this.userService.updateAttribute(
        request.user.userId,
        attributeName,
        attributeValue
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
