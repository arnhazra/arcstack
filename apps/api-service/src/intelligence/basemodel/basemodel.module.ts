import { Module } from "@nestjs/common"
import { BaseModelService } from "./basemodel.service"
import { BaseModelController } from "./basemodel.controller"
import { BaseModelsRepository } from "./basemodel.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { EntityModule } from "@/shared/entity/entity.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { CreateBaseModelCommandHandler } from "./commands/handler/create-base-model.handler"
import { FindAllBaseModelsQueryHandler } from "./queries/handler/find-all-base-models.handler"
import { FindOneBaseModelQueryHandler } from "./queries/handler/find-one-base-model.handler"
import { BaseModel, BaseModelSchema } from "./schemas/basemodel.schema"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: BaseModel.name, schema: BaseModelSchema }],
      DbConnectionMap.Intelligence
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
