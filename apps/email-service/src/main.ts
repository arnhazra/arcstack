import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { config } from "./config"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.RMQ_URI],
        queue: "sendEmail",
        queueOptions: { durable: true },
      },
    }
  )

  await app.listen()
}
bootstrap()
