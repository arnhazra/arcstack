import { Module } from "@nestjs/common"
import { BaseModelModule } from "./basemodel/basemodel.module"
import { FavouritesModule } from "./favourites/favourites.module"
import { ChatModule } from "./chat/chat.module"
import { envConfig } from "@/config"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { DerivedModelModule } from "./derivedmodel/derivedmodel.module"
import { HistoryModule } from "./history/history.module"

@Module({
  imports: [
    DatabaseModule.forRoot(
      envConfig.platformDatabaseURI,
      DbConnectionMap.Platform
    ),
    BaseModelModule,
    DerivedModelModule,
    ChatModule,
    FavouritesModule,
    HistoryModule,
  ],
})
export class IntelligenceModule {}
