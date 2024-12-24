import { Module } from "@nestjs/common"
import { ModelsService } from "./models.service"
import { ModelsController } from "./models.controller"
import { CreateModelCommandHandler } from "./commands/handler/create-model.handler"
import { ModelsRepository } from "./models.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "@/shared/database/database.module"
import { envConfig } from "@/config"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { Model, ModelSchema } from "./schemas/model.schema"
import { FindAllModelsQueryHandler } from "./queries/handler/find-all-models.handler"
import { FindOneModelQueryHandler } from "./queries/handler/find-one-model.handler"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRoot(
      envConfig.platformDatabaseURI,
      DbConnectionMap.Platform
    ),
    DatabaseModule.forFeature(
      [{ name: Model.name, schema: ModelSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [ModelsController],
  providers: [
    ModelsService,
    CreateModelCommandHandler,
    ModelsRepository,
    FindAllModelsQueryHandler,
    FindOneModelQueryHandler,
  ],
})
export class ModelsModule {}
