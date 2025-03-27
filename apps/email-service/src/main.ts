import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Transport } from "@nestjs/microservices"
import { config } from "./config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.RMQ_URI],
      queue: "sendEmail",
      queueOptions: { durable: true },
    },
  })

  await app.startAllMicroservices()
  await app.listen(5005)
}
bootstrap()
