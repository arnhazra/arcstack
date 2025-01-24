import { Module } from "@nestjs/common"
import { BaseModelsService } from "./basemodels.service"
import { BaseModelsController } from "./basemodels.controller"
import { CreateBaseModelCommandHandler } from "./commands/handler/create-base-model.handler"
import { BaseModelsRepository } from "./basemodels.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { BaseModel, BaseModelSchema } from "./schemas/basemodel.schema"
import { FindAllBaseModelsQueryHandler } from "./queries/handler/find-all-models.handler"
import { FindOneBaseModelQueryHandler } from "./queries/handler/find-one-model.handler"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: BaseModel.name, schema: BaseModelSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [BaseModelsController],
  providers: [
    BaseModelsService,
    CreateBaseModelCommandHandler,
    BaseModelsRepository,
    FindAllBaseModelsQueryHandler,
    FindOneBaseModelQueryHandler,
  ],
})
export class BaseModelsModule {}
