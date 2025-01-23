import { Module } from "@nestjs/common"
import { ModelsModule } from "./models/models.module"
import { FavouritesModule } from "./favourites/favourites.module"
import { IntelligenceModule } from "./intelligence/intelligence.module"

@Module({
  imports: [ModelsModule, IntelligenceModule, FavouritesModule],
})
export class PlatformModule {}
