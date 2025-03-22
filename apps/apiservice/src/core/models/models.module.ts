import { Module } from "@nestjs/common"
import { ModelsController } from "./models.controller"
import { ModelsService } from "./models.service"
import { CqrsModule } from "@nestjs/cqrs"
import { Model, ModelSchema } from "./schemas/models.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { GetModelsQueryHandler } from "./queries/handler/get-models.handler"
import { ModelsRepository } from "./models.repository"
import { EntityModule } from "@/shared/entity/entity.module"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Model.name, schema: ModelSchema }],
      DbConnectionMap.Core
    ),
  ],
  controllers: [ModelsController],
  providers: [ModelsService, ModelsRepository, GetModelsQueryHandler],
})
export class ModelsModule {}
