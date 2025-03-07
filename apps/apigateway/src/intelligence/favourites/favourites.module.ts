import { Module } from "@nestjs/common"
import { FavouritesService } from "./favourites.service"
import { FavouritesController } from "./favourites.controller"
import { FavouritesRepository } from "./favourites.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { EntityModule } from "@/shared/entity/entity.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { Favourite, FavouriteSchema } from "./schemas/favourites.schema"
import { FindAllFavouritesQueryHandler } from "./queries/handler/find-all-favourites.handler"
import { CreateFavouriteCommandHandler } from "./commands/handler/create-favourite.handler"
import { RemoveFavouriteCommandHandler } from "./commands/handler/remove-favourite.handler"
import { FindIfFavouritedQueryHandler } from "./queries/handler/find-if-favourited.handler"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Favourite.name, schema: FavouriteSchema }],
      DbConnectionMap.Intelligence
    ),
  ],
  controllers: [FavouritesController],
  providers: [
    FavouritesService,
    FavouritesRepository,
    CreateFavouriteCommandHandler,
    RemoveFavouriteCommandHandler,
    FindAllFavouritesQueryHandler,
    FindIfFavouritedQueryHandler,
  ],
})
export class FavouritesModule {}
