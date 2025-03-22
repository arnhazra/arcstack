import { Module } from "@nestjs/common"
import { CoreModule } from "./core/core.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { EntityModule } from "./shared/entity/entity.module"
import { AppController } from "./app.controller"
import { IntelligenceModule } from "./intelligence/intelligence.module"

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    EntityModule,
    IntelligenceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
