import { Module } from "@nestjs/common"
import { CollectionsService } from "./collections.service"
import { CollectionsController } from "./collections.controller"
import { CollectionsRepository } from "./collections.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { EntityModule } from "@/shared/entity/entity.module"
import { DbConnectionMap } from "@/shared/utils/db-connection.map"
import { Collection, CollectionSchema } from "./schemas/collections.schema"
import { FindAllCollectionsQueryHandler } from "./queries/handler/find-collection-list.handler"
import { CreateCollectionCommandHandler } from "./commands/handler/add-to-collection.handler"
import { RemoveCollectionCommandHandler } from "./commands/handler/remove-from-collection.handler"
import { FindIfCollectedQueryHandler } from "./queries/handler/find-if-collected.handler"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Collection.name, schema: CollectionSchema }],
      DbConnectionMap.Intelligence
    ),
  ],
  controllers: [CollectionsController],
  providers: [
    CollectionsService,
    CollectionsRepository,
    CreateCollectionCommandHandler,
    RemoveCollectionCommandHandler,
    FindAllCollectionsQueryHandler,
    FindIfCollectedQueryHandler,
  ],
})
export class CollectionsModule {}
