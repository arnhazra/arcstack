import { Module } from "@nestjs/common"
import { ModelsService } from "./models.service"
import { ModelsController } from "./models.controller"
import { BaseModelsRepository } from "./repositories/basemodels.repository"
import { DerivedModelsRepository } from "./repositories/derivedmodels.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { DerivedModel, DerivedModelSchema } from "./schemas/derivedmodel.schema"
import { CreateDerivedModelCommandHandler } from "./commands/handler/create-derived-model.handler"
import { CreateBaseModelCommandHandler } from "./commands/handler/create-base-model.handler"
import { FindAllDerivedModelsQueryHandler } from "./queries/handler/find-all-derived-models.handler"
import { FindOneDerivedModelQueryHandler } from "./queries/handler/find-one-derived-model.handler"
import { FindAllBaseModelsQueryHandler } from "./queries/handler/find-all-base-models.handler"
import { FindOneBaseModelQueryHandler } from "./queries/handler/find-one-base-model.handler"
import { BaseModel, BaseModelSchema } from "./schemas/basemodel.schema"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [
        { name: BaseModel.name, schema: BaseModelSchema },
        { name: DerivedModel.name, schema: DerivedModelSchema },
      ],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [ModelsController],
  providers: [
    ModelsService,
    BaseModelsRepository,
    DerivedModelsRepository,
    CreateBaseModelCommandHandler,
    CreateDerivedModelCommandHandler,
    FindAllDerivedModelsQueryHandler,
    FindOneDerivedModelQueryHandler,
    FindAllBaseModelsQueryHandler,
    FindOneBaseModelQueryHandler,
  ],
})
export class ModelsModule {}
