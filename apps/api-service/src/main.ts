import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({ exposedHeaders: ["token"] })
  await app.listen(8000)
}

bootstrap()
