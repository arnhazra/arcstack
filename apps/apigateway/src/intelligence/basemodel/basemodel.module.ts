import { Module } from "@nestjs/common"
import { BaseModelService } from "./basemodel.service"
import { BaseModelController } from "./basemodel.controller"
import { BaseModelsRepository } from "./basemodel.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { CreateBaseModelCommandHandler } from "./commands/handler/create-base-model.handler"
import { FindAllBaseModelsQueryHandler } from "./queries/handler/find-all-base-models.handler"
import { FindOneBaseModelQueryHandler } from "./queries/handler/find-one-base-model.handler"
import { BaseModel, BaseModelSchema } from "./schemas/basemodel.schema"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: BaseModel.name, schema: BaseModelSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [BaseModelController],
  providers: [
    BaseModelService,
    BaseModelsRepository,
    CreateBaseModelCommandHandler,
    FindAllBaseModelsQueryHandler,
    FindOneBaseModelQueryHandler,
  ],
})
export class BaseModelModule {}
