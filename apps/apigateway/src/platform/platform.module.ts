import { Module } from "@nestjs/common"
import { BaseModelModule } from "./basemodel/basemodel.module"
import { FavouritesModule } from "./favourites/favourites.module"
import { IntelligenceModule } from "./intelligence/intelligence.module"
import { envConfig } from "@/config"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { DerivedModelModule } from "./derivedmodel/derivedmodel.module"

@Module({
  imports: [
    DatabaseModule.forRoot(
      envConfig.platformDatabaseURI,
      DbConnectionMap.Platform
    ),
    BaseModelModule,
    DerivedModelModule,
    IntelligenceModule,
    FavouritesModule,
  ],
})
export class PlatformModule {}
