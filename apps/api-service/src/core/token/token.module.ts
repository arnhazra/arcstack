import { Module } from "@nestjs/common"
import { TokenService } from "./token.service"
import { TokenController } from "./token.controller"
import Redis from "ioredis"
import { config } from "src/config"

@Module({
  controllers: [TokenController],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis(config.REDIS_URI)
      },
    },
    TokenService,
  ],
})
export class TokenModule {}
