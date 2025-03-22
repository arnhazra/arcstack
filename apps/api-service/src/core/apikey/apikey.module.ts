import { Module } from "@nestjs/common"
import { APIKeyService } from "./apikey.service"
import { APIKeyController } from "./apikey.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { APIKey, APIKeySchema } from "./schemas/apikey.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { APIKeyRepository } from "./apikey.repository"
import { CreateAPIKeyCommandHandler } from "./commands/handler/create-apikey.handler"
import { DeleteAPIKeyCommandHandler } from "./commands/handler/delete-apikey.handler"
import { FindAllAPIKeyQueryHandler } from "./queries/handler/find-all-apikeys.handler"
import { FindAPIKeyQueryHandler } from "./queries/handler/find-apikey.handler"
import { FindAPIKeyByIdQueryHandler } from "./queries/handler/find-apikey-by-id.handler"
import { EntityModule } from "@/shared/entity/entity.module"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: APIKey.name, schema: APIKeySchema }],
      DbConnectionMap.Core
    ),
  ],
  controllers: [APIKeyController],
  providers: [
    APIKeyService,
    APIKeyRepository,
    CreateAPIKeyCommandHandler,
    DeleteAPIKeyCommandHandler,
    FindAllAPIKeyQueryHandler,
    FindAPIKeyQueryHandler,
    FindAPIKeyByIdQueryHandler,
  ],
})
export class APIKeyModule {}
