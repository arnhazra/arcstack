import { Module } from "@nestjs/common"
import { CoreModule } from "./core/core.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { DatabaseModule } from "./shared/database/database.module"
import { AppController } from "./app.controller"
import { IntelligenceModule } from "./intelligence/intelligence.module"

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    DatabaseModule,
    IntelligenceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
