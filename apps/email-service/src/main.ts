import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: "redis-14033.c282.east-us-mz.azure.cloud.redislabs.com",
        port: 14033,
        password: "Dzbh2hVjmPlHZSSc8McE3sD0aD3vEoDl",
        username: "default",
      },
    }
  )

  console.log("running")
  await app.listen()
}
bootstrap()
