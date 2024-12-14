import { Module } from "@nestjs/common"
import { AccessKeyService } from "./accesskey.service"
import { AccessKeyController } from "./accesskey.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { AccessKey, AccessKeySchema } from "./schemas/accesskey.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { AccessKeyRepository } from "./accesskey.repository"
import { CreateAccessKeyCommandHandler } from "./commands/handler/create-accesskey.handler"
import { DeleteAccessKeyCommandHandler } from "./commands/handler/delete-accesskey.handler"
import { FindAllAccessKeyQueryHandler } from "./queries/handler/find-all-accesskeys.handler"
import { FindAccessKeyQueryHandler } from "./queries/handler/find-accesskey.handler"
import { FindAccessKeyByIdQueryHandler } from "./queries/handler/find-accesskey-by-id.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: AccessKey.name, schema: AccessKeySchema }],
      DbConnectionMap.Core
    ),
  ],
  controllers: [AccessKeyController],
  providers: [
    AccessKeyService,
    AccessKeyRepository,
    CreateAccessKeyCommandHandler,
    DeleteAccessKeyCommandHandler,
    FindAllAccessKeyQueryHandler,
    FindAccessKeyQueryHandler,
    FindAccessKeyByIdQueryHandler,
  ],
})
export class AccessKeyModule {}
