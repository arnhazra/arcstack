import { Module } from "@nestjs/common"
import { NewsRoomService } from "./newsroom.service"
import { NewsRoomController } from "./newsroom.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [NewsRoomController],
  providers: [NewsRoomService],
})
export class NewsRoomModule {}
