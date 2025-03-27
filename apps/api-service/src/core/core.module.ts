import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { APIKeyModule } from "./apikey/apikey.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { UserModule } from "./user/user.module"
import { ModelsModule } from "./models/models.module"
import { config } from "src/config"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { ActivityModule } from "./activity/activity.module"
import { TokenModule } from "./token/token.module"
import { EntityModule } from "@/shared/entity/entity.module"
import { NewsRoomModule } from "./newsroom/newsroom.module"
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EntityModule.forRoot(config.CORE_DATABASE_URI, DbConnectionMap.Core),
    ApiReferenceModule,
    ActivityModule,
    APIKeyModule,
    SubscriptionModule,
    UserModule,
    ModelsModule,
    TokenModule,
    NewsRoomModule,
    EmailModule,
  ],
})
export class CoreModule {}
