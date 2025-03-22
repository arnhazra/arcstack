import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common"
import { FavouritesService } from "./favourites.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { ModRequest } from "@/shared/auth/types/mod-request.interface"

@Controller("favourites")
export class FavouritesController {
  constructor(private readonly service: FavouritesService) {}

  @UseGuards(TokenGuard)
  @Post(":id")
  create(@Request() request: ModRequest, @Param("id") id: string) {
    try {
      return this.service.create(request.user.userId, id)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll(@Request() request: ModRequest) {
    try {
      return this.service.findAll(request.user.userId)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get(":id")
  findIfFavourited(@Request() request: ModRequest, @Param("id") id: string) {
    try {
      return this.service.findIfFavourited(request.user.userId, id)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Delete(":id")
  remove(@Request() request: ModRequest, @Param("id") id: string) {
    try {
      return this.service.remove(request.user.userId, id)
    } catch (error) {
      throw error
    }
  }
}
