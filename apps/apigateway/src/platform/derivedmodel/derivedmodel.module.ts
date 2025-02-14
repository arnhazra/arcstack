import { Module } from "@nestjs/common"
import { DerivedModelRepository } from "./derivedmodel.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "@/shared/database/database.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { DerivedModel, DerivedModelSchema } from "./schemas/derivedmodel.schema"
import { CreateDerivedModelCommandHandler } from "./commands/handler/create-derived-model.handler"
import { FindAllDerivedModelsQueryHandler } from "./queries/handler/find-all-derived-models.handler"
import { FindOneDerivedModelQueryHandler } from "./queries/handler/find-one-derived-model.handler"
import { DerivedModelController } from "./derivedmodel.controller"
import { DerivedModelService } from "./derivedmodel.service"
import { FindFilterCategoriesQueryHandler } from "./queries/handler/find-filter-categories.handler"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: DerivedModel.name, schema: DerivedModelSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [DerivedModelController],
  providers: [
    DerivedModelService,
    DerivedModelRepository,
    CreateDerivedModelCommandHandler,
    FindAllDerivedModelsQueryHandler,
    FindOneDerivedModelQueryHandler,
    FindFilterCategoriesQueryHandler,
  ],
})
export class DerivedModelModule {}
