import { Module } from "@nestjs/common"
import { ChatService } from "./chat.service"
import { ChatController } from "./chat.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Thread, ThreadSchema } from "./schemas/thread.schema"
import { CreateThreadCommandHandler } from "./commands/handler/create-thread.handler"
import { ChatRepository } from "./chat.repository"
import { DatabaseModule } from "src/shared/database/database.module"
import { FetchThreadByIdQueryHandler } from "./queries/handler/fetch-thread-by-id.handler"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: Thread.name, schema: ThreadSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRepository,
    CreateThreadCommandHandler,
    FetchThreadByIdQueryHandler,
  ],
})
export class ChatModule {}
