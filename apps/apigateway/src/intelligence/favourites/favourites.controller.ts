import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common"
import { FavouritesService } from "./favourites.service"

@Controller("favourites")
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post(":id")
  create(@Param("id") id: string) {
    return this.favouritesService.create(id)
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll()
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.favouritesService.remove(+id)
  }
}
