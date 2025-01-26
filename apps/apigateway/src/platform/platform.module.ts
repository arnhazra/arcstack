import { Module } from "@nestjs/common"
import { ModelsModule } from "./models/models.module"
import { FavouritesModule } from "./favourites/favourites.module"
import { IntelligenceModule } from "./intelligence/intelligence.module"
import { envConfig } from "@/config"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"

@Module({
  imports: [
    DatabaseModule.forRoot(
      envConfig.platformDatabaseURI,
      DbConnectionMap.Platform
    ),
    ModelsModule,
    IntelligenceModule,
    FavouritesModule,
  ],
})
export class PlatformModule {}
