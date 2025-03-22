import { Module } from "@nestjs/common"
import { ChatService } from "./chat.service"
import { ChatController } from "./chat.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Thread, ThreadSchema } from "./schemas/thread.schema"
import { CreateThreadCommandHandler } from "./commands/handler/create-thread.handler"
import { ChatRepository } from "./chat.repository"
import { EntityModule } from "@/shared/entity/entity.module"
import { FetchThreadByIdQueryHandler } from "./queries/handler/fetch-thread-by-id.handler"
import { GetUsageByUserIdQueryHandler } from "./queries/handler/get-usage-by-user-id.handler"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Thread.name, schema: ThreadSchema }],
      DbConnectionMap.Intelligence
    ),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRepository,
    CreateThreadCommandHandler,
    FetchThreadByIdQueryHandler,
    GetUsageByUserIdQueryHandler,
  ],
})
export class ChatModule {}
